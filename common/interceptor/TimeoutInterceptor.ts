import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import ConfigService from '../services/ConfigService';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {

  private readonly _requestTimeout: number;

  constructor(private readonly _configService: ConfigService) {
    const serviceConfig = this._configService.service;
    this._requestTimeout = serviceConfig.requestTimeout;
  }

  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(this._requestTimeout));
  }
  
}