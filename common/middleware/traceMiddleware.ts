import { INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';
import * as opentracing from 'opentracing';
import TraceService from '../services/TraceService';
import ConfigService from '../services/ConfigService';
import MetaDataKey from '../enum/MetaDataKey';
const threadStorage = require('cls-hooked');

// @ts-ignore
export default function traceMiddleware(app: INestApplication) {
    const serviceConfig = app.get(ConfigService).service;
    const traceService = app.get(TraceService);
    const localStorage = threadStorage.createNamespace(serviceConfig.name);

    // @ts-ignore
    return (request: Request, response: Response, next: Function) => {
        // hookup
        localStorage.bindEmitter(request);
        localStorage.bindEmitter(response);

        localStorage.run(() => {
            const headers = {}
            const span = traceService.createSpan(request.path);
            span.setTag('http-method', request.method);
            span.setTag('http-query', request.query);
            span.setTag('http-headers', request.headers);
            const tracer = span.tracer();
            tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
            Object.keys(headers)
                    .forEach(key => {
                        response.set(key, headers[key]);
                    });
            Object.assign(request.headers, headers);
            localStorage.set(MetaDataKey.traceHeader, headers);
            next();
            span.finish();
        });
    }
}