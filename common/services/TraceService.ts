import { Injectable, Inject } from '@nestjs/common';
import * as opentracing from 'opentracing';
import LogService from './LogService';
import ConfigService from './ConfigService';
import { Observable } from 'rxjs';
//import { Observable} from 'rxjs';
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

    trace(id: string, handler: (span: any) => Promise<Observable<any>>): Promise<Observable<any>> {
        console.log('***************************');
        console.log('id : ', id);
        console.log('***************************');
        const span = this._tracer.startSpan(id);
        return handler(span)
            .then(response => {               
                span.finish();
                return response;
            })
            .catch(err => {
                return Promise.reject(err);
            });
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