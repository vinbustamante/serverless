import { Module } from '@nestjs/common';
import AuthenticationRepositoriesModule from '../repositories/authentication.repositories.module';

// services
import ApplicationService from './ApplicationService';
import ApplicationServiceCacheable from './cacheable/ApplicationServiceCacheable';

@Module({
    imports: [
        AuthenticationRepositoriesModule
    ],
    providers: [
        {
            provide: ApplicationService,
            useClass: ApplicationServiceCacheable
        }        
    ],
    exports: [
        ApplicationService
    ]
})
export default class AuthenticationServicesModule { }