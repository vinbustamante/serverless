import { Module } from '@nestjs/common';
import AuthenticationRepositoriesModule from '../repositories/authentication.repositories.module';

// services
import ApplicationService from './ApplicationService';
import ApplicationServiceCacheable from './cacheable/ApplicationServiceCacheable';
import UserService from './UserService';
import AuthenticationService from './AuthenticationService';

@Module({
    imports: [
        AuthenticationRepositoriesModule
    ],
    providers: [
        {
            provide: ApplicationService,
            useClass: ApplicationServiceCacheable
        },
        UserService,
        AuthenticationService
    ],
    exports: [
        ApplicationService,
        UserService,
        AuthenticationService
    ]
})
export default class AuthenticationServicesModule { }