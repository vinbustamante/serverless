import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import JwtService from '../services/JwtService';
import Public from '../../../../../common/decorator/public';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private readonly _jwtService: JwtService;

    @Public()
    @Post('login')
    async login(@Body() credential: UserAuthenticationViewModel) {
        const token = await this._jwtService.login(credential);
        return token;
    }
}