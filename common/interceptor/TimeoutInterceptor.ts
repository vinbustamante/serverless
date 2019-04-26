import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import ConfigService from '../services/ConfigService';
// import TraceService from '../services/TraceService';
// import ReflectionService from '../services/ReflectionService';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {

  private readonly _requestTimeout: number;

  // @Inject()
  // private readonly _traceService: TraceService;

  // @Inject()
  //   private readonly _reflectionService: ReflectionService;

  constructor(private readonly _configService: ConfigService) {
    const serviceConfig = this._configService.service;
    this._requestTimeout = serviceConfig.requestTimeout;
  }

  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const id = this._reflectionService.name(this);
    // const request = context.switchToHttp().getRequest();
    // const parentContext = this._traceService.getContext(request.headers);
    return next.handle()
        .pipe(timeout(this._requestTimeout));    
  }
  
}