import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import ApplicationService from '../services/ApplicationService';
import Public from '../../../../../common/decorator/public';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private _applicationService: ApplicationService;


    @Public()
    @Post()
    async createToken(@Body() credential: UserAuthenticationViewModel) {
        const application = await this._applicationService.getById(credential.clientId);
        return application;
    }    
}