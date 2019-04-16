import { Module } from '@nestjs/common';
import AuthenticationRepositoriesModule from '../repositories/authentication.repositories.module';

// services
import ApplicationService from './ApplicationService';

@Module({
    imports: [
        AuthenticationRepositoriesModule
    ],
    providers: [
        ApplicationService
    ],
    exports: [
        ApplicationService
    ]
})
export default class AuthenticationServicesModule { }