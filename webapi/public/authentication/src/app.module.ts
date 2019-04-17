import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './services/app.service';
import AuthService from './services/AuthService';
import AuthenticationController from './controllers/AuthenticationController';
import JwtStrategy from './lib/passport/JwtStrategy';

import CommonGlobalModule from '../../../../common/common.global.module';
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
    CommonGlobalModule,
    CommonServicesModule,
    AuthenticationServicesModule
  ],
  controllers: [AppController, AuthenticationController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy    
  ],
  exports: [PassportModule],
})
export class AppModule { }