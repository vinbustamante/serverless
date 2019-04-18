import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import AuthenticationService from '../services/AuthenticationService';
import JwtService from '../services/JwtService';
import Public from '../../../../../common/decorator/public';
import DateService from '../../../../../common/services/DateService';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private readonly _authenticationService: AuthenticationService;

    @Inject()
    private readonly _jwtService: JwtService;

    @Inject()
    private readonly _dateService: DateService;

    @Public()
    @Post('login')
    async login(@Body() credential: UserAuthenticationViewModel) {       
        const result = await this._authenticationService.login(credential);
        const jwtPayload = {
                clientId: credential.clientId,
                displayName: result.displayName,
                groups: result.groups
        };
        const accessToken = await this._jwtService.createToken({
            payload: jwtPayload,
            option: {
                issuer: 'issuer',
                subject: 'subject',
                audience: 'audience',
                ttl: '1d'
            }
        });
        return {
            access_token: accessToken
        };
    }
}