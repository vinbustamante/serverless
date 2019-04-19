import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import AllExceptionFilter from './filter/AllExceptionFilter';
import TokenBearerGuard from './guard/TokenBearerGuard';
import CommonServicesModule from './services/common.services.module';

import TimeoutInterceptor from './interceptor/TimeoutInterceptor';
import RequestAuditInterceptor from './interceptor/RequestAuditInterceptor';

@Module({
    imports:[
        CommonServicesModule
    ],
    providers:[
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestAuditInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: TokenBearerGuard,
        },
        {
            provide: APP_PIPE,
            useFactory: (): any => {
              return new ValidationPipe({
                disableErrorMessages: false
              });
            }
        }
    ],
    exports: []
})
export default class CommonGlobalModule { }