import { Controller, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
import AuthenticationService from '../services/AuthenticationService';
import JwtService from '../services/JwtService';
import Public from '../../../../../common/decorator/public';

@Controller('authentication')
export default class AuthenticationController {

    @Inject()
    private readonly _authenticationService: AuthenticationService;

    @Inject()
    private readonly _jwtService: JwtService;

    @Public()
    @Post('login')
    async login(@Body() credential: UserAuthenticationViewModel) {
        const result = await this._authenticationService.login(credential);
         // let jwtPayload = {
            //     clientId: client.clientID,
            //     userId: user.id,
            //     displayName: user.displayName,
            //     groups: userGroups || await this._getGroups(user.groups)
            // }; 
        const token = await this._jwtService.createToken({
            payload: {
            },
            option: {
                issuer: 'issuer',
                subject: 'subject',
                audience: 'audience',
                ttl: '1d'
            }
        });
        return {
            result: result,
            token: token
        };
    }
}