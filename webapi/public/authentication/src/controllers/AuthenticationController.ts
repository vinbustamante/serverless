import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import AuthenticationService from '../services/AuthenticationService';
import Public from '../../../../../common/decorator/public';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private _authenticationService: AuthenticationService;

    @Public()
    @Post('login')
    async login(@Body() credential: UserAuthenticationViewModel) {
        const result = await this._authenticationService.login(credential);
        return result;
    }
}