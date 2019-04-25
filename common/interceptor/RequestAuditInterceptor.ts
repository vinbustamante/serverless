import { Injectable, Inject, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import MetaDataKey from '../enum/MetaDataKey';
import { tap } from 'rxjs/operators';
import AuditService from '../services/AuditService';
import TraceService from '../services/TraceService';
import ReflectionService from '../services/ReflectionService';
import name from '../decorator/name';

// import * as opentracing from 'opentracing';
// const initJaegerTracer = require('jaeger-client').initTracer;
//const tracer = initTracer('my-service-api') as opentracing.Tracer;

@Injectable()
@name('audit-interceptor')
export default class RequestAuditInterceptor implements NestInterceptor {

    @Inject()
    private readonly _reflector: Reflector;

    @Inject()
    private readonly _auditService: AuditService;
    
    @Inject()
    private readonly _reflectionService: ReflectionService;

    @Inject()
    private readonly _traceService: TraceService;

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {       
        // console.log('********* _traceService ******************');
        // console.log(this._traceService);
        // console.log('***************************');
        // const requestAuditInfo = this._createRequestAuditInfo(context);
        // await this._auditService.record(requestAuditInfo);
        // return next
        //     .handle()
        //     .pipe(
        //         tap(async (httpBody) => {
        //             let responseAuditInfo = this._createResponseAuditInfo(context, httpBody);
        //             await this._auditService.record(responseAuditInfo);
        //         })
        //     );   

        // const span = tracer.startSpan('http_request');
        // span.log({'event': 'request_start'});
        // const requestAuditInfo = this._createRequestAuditInfo(context);
        // await this._auditService.record(requestAuditInfo);
        // return next
        //     .handle()
        //     .pipe(
        //         tap(async (httpBody) => {
        //             let responseAuditInfo = this._createResponseAuditInfo(context, httpBody);
        //             span.finish();
        //             await this._auditService.record(responseAuditInfo);
        //         })
        //     );
        const id = this._reflectionService.name(this);
        return this._traceService.trace(id, async (span) => {
            const requestAuditInfo = this._createRequestAuditInfo(context);
            await this._auditService.record(requestAuditInfo);
            return next
                .handle()
                .pipe(
                    tap(async (httpBody) => {                        
                        let responseAuditInfo = this._createResponseAuditInfo(context, httpBody);
                        span.finish();
                        await this._auditService.record(responseAuditInfo);
                        return httpBody;
                    })
                );
        });
    }

    private _createRequestAuditInfo(context: ExecutionContext): object {
        return {
            request: this._createRequestInfo(context),
            handler: this._createHandlerInfo(context)
        };
    }

    private _createResponseAuditInfo(context: ExecutionContext, httpBody: any): object {
        return {
            response: this._createResponseInfo(context, httpBody),
            handler: this._createHandlerInfo(context)
        };
    }

    private _createRequestInfo(context: ExecutionContext): object {
        const request: express.Request = context.switchToHttp().getRequest();
        const excludeBodyForAudit = this._reflector.get<boolean>(MetaDataKey.excludeRequestBodyForAudit, context.getHandler()) === true;
        const info = {
            url: request.url,
            path: request.path,
            query: request.query,
            httpMethod: request.method,
            headers: request.headers,
            body: excludeBodyForAudit ? null : request.body
        };
        return info;
    }

    private _createResponseInfo(context: ExecutionContext, httpBody?: any): object {
        const request: express.Request = context.switchToHttp().getRequest();
        const response: express.Response = context.switchToHttp().getResponse();
        const excludeBodyForAudit = this._reflector.get<boolean>(MetaDataKey.excludeResponseBodyForAudit, context.getHandler()) === true;
        const info = {
            url: request.url,
            status: response.statusCode,
            path: request.path,
            query: request.query,
            httpMethod: request.method,
            body: excludeBodyForAudit ? null : httpBody
        };
        return info;
    }

    private _createHandlerInfo(context: ExecutionContext) {
        const controller = context.getClass();
        const action = context.getHandler();
        const controllerName = this._reflector.get<string>(MetaDataKey.name, controller) || controller.name;
        const actionName = this._reflector.get<string>(MetaDataKey.name, action) || action.name;
        return {
            handler: {
                controller: controllerName,
                action: actionName,
            }
        };
    }
}

// function initTracer(serviceName: string) {
//     const config = {
//       serviceName: serviceName,
//       sampler: {
//         type: 'const',
//         param: 1,
//       },
//       reporter: {
//         logSpans: true, // this logs whenever we send a span
//       },
//     };
//     const options = {
//       logger: {
//         info: function logInfo(msg: string) {
//           console.log('INFO  ', msg);
//         },
//         error: function logError(msg: string) {
//           console.log('ERROR ', msg);
//         },
//       },
//     };
//     return initJaegerTracer(config, options);
//   }