import { Injectable, Inject, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import MetaDataKey from '../enum/MetaDataKey';
import { tap } from 'rxjs/operators';

@Injectable()
export default class RequestAuditInterceptor implements NestInterceptor {

    @Inject()
    private readonly _reflector: Reflector;

    // @ts-ignore
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestAuditInfo = this._createRequestAuditInfo(context);
        console.log('********** requestAuditInfo *****************');
        console.log(requestAuditInfo);
        console.log('***************************');

        return next
            .handle()
            .pipe(
                tap(httpBody => {
                    const responseAuditInfo = this._createResponseAuditInfo(context, httpBody);
                    console.log('******** responseAuditInfo *******************');
                    console.log(responseAuditInfo);
                    console.log('***************************');
                })
            );
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