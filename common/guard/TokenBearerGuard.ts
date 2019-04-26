import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import ReflectionService from '../services/ReflectionService';
import TraceService from '../services/TraceService';
import MetaDataKey from '../enum/MetaDataKey';

@Injectable()
export default class TokenBearerGuard implements CanActivate {

    @Inject()
    private _reflector: Reflector;

    @Inject()
    private readonly _reflectionService: ReflectionService;

    @Inject()
    private readonly _traceService: TraceService;

    canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {      
        // let isAllowed = false;
        // const handler = context.getHandler();
        // const isPublic = this._reflector.get<boolean>(MetaDataKey.publicHandler, handler);
        // if (isPublic === true) {
        //     isAllowed = true;
        // } else {
        //     // make sure bearer token is present
        //     const request = context.switchToHttp().getRequest();
        //     const headers = request.headers;
        //     const authorisation = headers.authorization || '';
        //     const values: string[] = authorisation.split(' ');
        //     isAllowed = values.length === 2 && values[0] === 'Bearer' && values[1].length > 0;
        // }
        // if (isAllowed === false) {
        //     throw new UnauthorizedException("Access denied");
        // }
        // return isAllowed;
        const id = this._reflectionService.name(this);
        return this._traceService.trace(id, async (span) => {
            let isAllowed = false;
            const handler = context.getHandler();
            const isPublic = this._reflector.get<boolean>(MetaDataKey.publicHandler, handler);
            if (isPublic === true) {
                isAllowed = true;
            } else {
                // make sure bearer token is present
                const request = context.switchToHttp().getRequest();
                const headers = request.headers;
                const authorisation = headers.authorization || '';
                const values: string[] = authorisation.split(' ');
                isAllowed = values.length === 2 && values[0] === 'Bearer' && values[1].length > 0;
            }
            if (isAllowed === false) {
                throw new UnauthorizedException("Access denied");
            }
            span.finish();
            return isAllowed;
        });
    }
}