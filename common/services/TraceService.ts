import { Injectable, Inject } from '@nestjs/common';
import * as opentracing from 'opentracing';
import LogService from './LogService';
import ConfigService from './ConfigService';
import MetaDataKey from '../enum/MetaDataKey';
const initJaegerTracer = require('jaeger-client').initTracer;
let threadStorage = require('continuation-local-storage');

@Injectable()
export default class TraceService {

    private _tracer: opentracing.Tracer;
    private _threadLocalSrorage: any;

    @Inject()
    private readonly _logService: LogService;    

    constructor(private readonly _configService: ConfigService) {
        const serviceConfig = this._configService.service;
        this._tracer = this._initTracer(serviceConfig.name);        
    }

    createSpan(id: string) {
        return this._tracer.startSpan(id);
    }

    trace(id: string, handler: (span: any) => Promise<any>, parentSpan?: any): Promise<any> {
        let parentContext = this._createParentContext(parentSpan);
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

    private _createParentContext(parentSpan?: any) {
        let parentContext: any;
        if (!parentSpan) {
            parentSpan = this.getContext();
        }
        if (parentSpan) {
            parentContext= {
                childOf: parentSpan
            };
        }
        return parentContext;
    }

    getContext(span?: any) {
        let context: any;
        if (this._threadLocalSrorage === undefined) {
            const serviceConfig = this._configService.service; 
            this._threadLocalSrorage = threadStorage.getNamespace(serviceConfig.name);
            if (!this._threadLocalSrorage) {
                this._threadLocalSrorage = threadStorage.createNamespace(serviceConfig.name);
            }
        }
        const header = span || this._threadLocalSrorage.get(MetaDataKey.traceHeader);
        if (header) {
            context = this._tracer.extract(opentracing.FORMAT_HTTP_HEADERS, header);
        }
        return context;
    }
}