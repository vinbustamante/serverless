import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import ApplicationService from '../services/ApplicationService';
import publicHandler from '../../../../../common/decorator/publicHandler';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private _applicationService: ApplicationService;

    @Post()
    async createToken(@Body() credential: UserAuthenticationViewModel) {
        const application = await this._applicationService.getById(credential.clientId);
        return application;
    }

    @publicHandler()
    @Get('test')
    test() {
        return 'test';
    }
}