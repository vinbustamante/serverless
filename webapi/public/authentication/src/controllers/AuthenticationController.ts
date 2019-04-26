import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import JwtService from '../services/JwtService';
import Public from '../../../../../common/decorator/public';
import name from '../../../../../common/decorator/name';
import TraceService from '../../../../../common/services/TraceService';
import { excludeRequestBodyForAudit } from '../../../../../common/decorator/excludeForAudit';

@Controller('authentication')
@name('authentication')
export default class AuthenticationController {

    @Inject()
    private readonly _jwtService: JwtService;

    @Inject()
    private readonly _traceService: TraceService;

    @Post('login')
    @Public()
    @excludeRequestBodyForAudit()
    async login(@Body() credential: UserAuthenticationViewModel) {
        console.log('***************************');
        console.log('controller : ', this._traceService.getContext());
        console.log('***************************');
        const token = await this._jwtService.login(credential);
        return token;
    }
}