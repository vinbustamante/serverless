import { INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';
import * as opentracing from 'opentracing';
import TraceService from '../services/TraceService';

// @ts-ignore
export default function traceMiddleware(app: INestApplication) {
    // @ts-ignore
    return (request: Request, response: Response, next: Function) => {
        const traceService = app.get(TraceService);
        const parentContext: any = traceService.extractContext(request.headers);
        // @ts-ignore
        traceService.trace('http-authentication', (span) => {
            const headers = {}
            const tracer = span.tracer();
            tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
            Object.keys(headers)
                .forEach(key => {
                    response.set(key, headers[key]);
                });
            Object.assign(request.headers, headers);
            return Promise.resolve()
                .then(() => {
                    next();
                });
        }, parentContext);
    }
}