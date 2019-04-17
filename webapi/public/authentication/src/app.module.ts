import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './services/app.service';
import AuthService from './services/AuthService';
import AuthenticationController from './controllers/AuthenticationController';
import JwtStrategy from './lib/passport/JwtStrategy';
import TimeoutInterceptor from '../../../../common/interceptor/TimeoutInterceptor';
import AllExceptionFilter from '../../../../common/filter/AllExceptionFilter';
import TokenBearerGuard from '../../../../common/guard/TokenBearerGuard';

// common services
// import UtilService from '../../../../common/services/UtilService';

import CommonServicesModule from '../../../../common/services/common.services.module';
import AuthenticationServicesModule from './services/authentication.services.module';

// controllers
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    CommonServicesModule,
    AuthenticationServicesModule
  ],
  controllers: [AppController, AuthenticationController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
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
    },
  ],
  exports: [PassportModule],
})
export class AppModule { }