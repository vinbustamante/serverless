import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import AuthConfigService from './AuthConfigService';
import JwtCreateTokenDto from './dto/JwtCreateTokenDto';
import JwtTokenDto from './dto/JwtTokenDto';
import AuthenticationDto from './dto/AuthenticationDto';
import AuthenticationService from './AuthenticationService';
import AuthenticationResultDto from './dto/AuthenticationResultDto';
import DateService from '../../../../../common/services/DateService';

@Injectable()
export default class JwtService {

    @Inject()
    private readonly _authConfigService: AuthConfigService;

    @Inject()
    private readonly _authenticationService: AuthenticationService;

    @Inject()
    private readonly _dateService: DateService;

    async login(credential: AuthenticationDto): Promise<JwtTokenDto> {
        const token = new JwtTokenDto();
        if (credential) {
            const jwtConfig = this._authConfigService.jwt;
            const loginResult = await this._authenticationService.login(credential);
            token.access_token = await this._createAccessToken(credential, loginResult);
            token.refresh_token = await this._createRefreshToken(credential, loginResult);
            token.expires_in = this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL);
        }
        return token;
    }

    async createToken(createTokenDto: JwtCreateTokenDto): Promise<string> {
        let token: string;
        if (createTokenDto) {
            const jwtConfig = this._authConfigService.jwt;
            const jwtOptions = {
                issuer: createTokenDto.option.issuer || jwtConfig.issuer,
                subject: createTokenDto.option.subject,
                audience: createTokenDto.option.audience,
                expiresIn: createTokenDto.option.ttl,
                algorithm: jwtConfig.encryption
            };
            const privateKey = jwtConfig.privatekey;
            token = await jwt.sign(createTokenDto.payload, privateKey, jwtOptions);
        }
        return token;
    }

    private async _createAccessToken(credential: AuthenticationDto, loginResult: AuthenticationResultDto): Promise<string> {
        const jwtConfig = this._authConfigService.jwt;
        const jwtPayload = {
            clientId: credential.clientId,
            displayName: loginResult.displayName,
            groups: loginResult.groups
        };
        const accessToken = await this.createToken({
            payload: jwtPayload,
            option: {
                issuer: jwtConfig.issuer,
                subject: credential.username,
                audience: credential.username,
                ttl: this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL)
            }
        });
        return accessToken;
    }

    private async _createRefreshToken(credential: AuthenticationDto, loginResult: AuthenticationResultDto): Promise<string> {
        const jwtConfig = this._authConfigService.jwt;
        const jwtPayload = {
            clientId: credential.clientId,
            displayName: loginResult.displayName,
            groups: loginResult.groups
        };
        const accessToken = await this.createToken({
            payload: jwtPayload,
            option: {
                issuer: jwtConfig.issuer,
                subject: credential.username,
                audience: credential.username,
                ttl: this._dateService.timespanToSeconds(jwtConfig.refreshTokenTTL)
            }
        });
        return accessToken;
    }
}