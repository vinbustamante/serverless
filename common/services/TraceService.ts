import { Injectable, Inject } from '@nestjs/common';
import * as opentracing from 'opentracing';
import LogService from './LogService';
import ConfigService from './ConfigService';
const initJaegerTracer = require('jaeger-client').initTracer;

@Injectable()
export default class TraceService {

    private _tracer: opentracing.Tracer;

    @Inject()
    private readonly _logService: LogService;

    constructor(private readonly _configService: ConfigService) {
        const serviceConfig = this._configService.service;
        this._tracer = this._initTracer(serviceConfig.name);
    }

    trace(id: string, handler: (span: any) => Promise<any>, parentSpan?: any): Promise<any> {
        let parentContext: any;
        if (parentSpan) {
            parentContext= {
                childOf: parentSpan
            };
        }
        const span = this._tracer.startSpan(id, parentContext);
        return handler(span)
            .then(response => {               
                span.finish();
                return response;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    extractContext(span) {
        return this._tracer.extract(opentracing.FORMAT_HTTP_HEADERS, span);
    }

    private _initTracer(serviceName: string) {
        const config = {
            serviceName: serviceName,
            sampler: {
                type: 'const',
                param: 1,
            },
            reporter: {
                logSpans: true, // this logs whenever we send a span
            },
        };
        const options = {
            logger: this._logService
        };
        return initJaegerTracer(config, options);
    }
}