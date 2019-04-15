import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import AuthService from './services/AuthService';
import AuthenticationController from './controllers/AuthenticationController';
import JwtStrategy from './lib/passport/JwtStrategy';
import mongoDbConnectionFactory from '../../../../common/repositories/factories/mongoDbConnectionFactory'

//common services
import UtilService from '../../../../common/services/UtilService';

//repositories
import ApplicationRepository from './repositories/ApplicationRepository';

//controllers
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

    //services
    UtilService
  ],
  exports: [PassportModule],
})
export class AppModule {}