import { Module } from '@nestjs/common';
import AuthenticationRepositoriesModule from '../repositories/authentication.repositories.module';
import commonServicesModule from '../../../../../common/services/common.services.module';

// services
import ApplicationService from './ApplicationService';
// import ApplicationServiceCacheable from './cacheable/ApplicationServiceCacheable';
import UserService from './UserService';
import AuthenticationService from './AuthenticationService';
import AuthConfigService from './AuthConfigService';
import JwtService from './JwtService';

@Module({
    imports: [
        commonServicesModule,
        AuthenticationRepositoriesModule
    ],
    providers: [
        // {
        //     provide: ApplicationService,
        //     useClass: ApplicationServiceCacheable
        // },
        ApplicationService,
        UserService,
        AuthenticationService,
        JwtService,
        AuthConfigService
    ],
    exports: [
        ApplicationService,
        UserService,
        AuthenticationService,
        JwtService,
        AuthConfigService
    ]
})
export default class AuthenticationServicesModule { }