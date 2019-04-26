import { INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';
import * as opentracing from 'opentracing';
import TraceService from '../services/TraceService';
// import ConfigService from '../services/ConfigService';
import MetaDataKey from '../enum/MetaDataKey';
const threadStorage = require('continuation-local-storage');
const uuid = require('node-uuid');

// @ts-ignore
export default function traceMiddleware(app: INestApplication) {
    // const serviceConfig = app.get(ConfigService).service;
    const traceService = app.get(TraceService);
    const localStorage = threadStorage.createNamespace('servicename');

    // @ts-ignore
    return (request: Request, response: Response, next: Function) => {
        // hookup
        //const localStorage = threadStorage.getNamespace(serviceConfig.name);
        var tid = uuid.v4();
        localStorage.bindEmitter(request);
        localStorage.bindEmitter(response);

        localStorage.run(() => {
            const headers = {}
            const span = traceService.createSpan('trace-middleware');
            const tracer = span.tracer();
            tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
            Object.keys(headers)
                    .forEach(key => {
                        response.set(key, headers[key]);
                    });
            Object.assign(request.headers, headers);
            console.log('***************************');
            console.log('set trace header');
            console.log('***************************');
            localStorage.set('tid', tid);
            localStorage.set(MetaDataKey.traceHeader, headers);            
            next();
            span.finish();
        });
    }
}