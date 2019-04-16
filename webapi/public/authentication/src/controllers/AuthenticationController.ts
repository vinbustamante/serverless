import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import ApplicationRepository from '../repositories/ApplicationRepository';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private _applicationRepository: ApplicationRepository;

    @Post()
    async createToken(@Body() credential: UserAuthenticationViewModel) {
        const application = await this._applicationRepository.getById(credential.clientId);
        return application;
    }

}