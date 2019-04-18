import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import ConfigService from '../services/ConfigService';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {

  @Inject()
  private readonly _configService: ConfigService;

  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestTimeout = this._configService.requestTimeout;
    return next.handle().pipe(timeout(requestTimeout));
  }
  
}