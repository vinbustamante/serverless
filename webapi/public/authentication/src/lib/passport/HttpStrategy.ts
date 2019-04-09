import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import AuthService from '../../services/AuthService';

@Injectable()
export default class HttpStrategy extends PassportStrategy(Strategy) {

    // @Inject()
    // private _authService: AuthService;

    constructor(private readonly _authService: AuthService) {
        super();
    }
    
    async validate(token: string) {
        const user = await this._authService.validateUser(token);
        if (!user) {
            throw new UnauthorizedException('weeeee');
        }
        return user
    }
}