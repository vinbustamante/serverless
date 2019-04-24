import { Injectable, Inject } from '@nestjs/common';
import * as opentracing from 'opentracing';
import LogService from './LogService';
import ConfigService from './ConfigService';
const initJaegerTracer = require('jaeger-client').initTracer;

@Injectable()
export default class TraceService {

    private readonly _tracer: opentracing.Tracer;

    @Inject()
    private readonly _logService: LogService;

    @Inject()
    private readonly _configService: ConfigService;

    constructor() {
        this._tracer = this._initTracer(this._configService.serviceName);
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