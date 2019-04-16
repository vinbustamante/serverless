import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './services/app.service';
import AuthService from './services/AuthService';
import AuthenticationController from './controllers/AuthenticationController';
import JwtStrategy from './lib/passport/JwtStrategy';
import mongoDbConnectionFactory from '../../../../common/repositories/factories/mongoDbConnectionFactory';
import TimeoutInterceptor from '../../../../common/interceptor/TimeoutInterceptor';
import AllExceptionFilter from '../../../../common/filter/AllExceptionFilter';

// common services
import UtilService from '../../../../common/services/UtilService';

// repositories
import ApplicationRepository from './repositories/ApplicationRepository';

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
  ],
  controllers: [AppController, AuthenticationController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    ...mongoDbConnectionFactory,
    ApplicationRepository,

    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: (): any => {
        return new ValidationPipe({
          disableErrorMessages: false
        });
      }
    },

    //services
    UtilService
  ],
  exports: [PassportModule],
})
export class AppModule { }