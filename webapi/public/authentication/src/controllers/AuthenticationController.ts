import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import JwtService from '../services/JwtService';
import Public from '../../../../../common/decorator/public';
import name from '../../../../../common/decorator/name';
import { excludeRequestBodyForAudit } from '../../../../../common/decorator/excludeBodyForAudit';

@Controller('authentication')
@name('authentication')
export default class AuthenticationController {

    @Inject()
    private readonly _jwtService: JwtService;

    @Post('login')
    @Public()
    @excludeRequestBodyForAudit()
    async login(@Body() credential: UserAuthenticationViewModel) {
        const token = await this._jwtService.login(credential);
        return token;
    }
}