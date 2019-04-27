import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import AuthConfigService from './AuthConfigService';
import JwtCreateTokenDto from './dto/JwtCreateTokenDto';
import JwtTokenDto from './dto/JwtTokenDto';
import AuthenticationDto from './dto/AuthenticationDto';
import AuthenticationService from './AuthenticationService';
import AuthenticationResultDto from './dto/AuthenticationResultDto';
import DateService from '../../../../../common/services/DateService';
import FlowService from '../../../../../common/services/FlowService';
import ReflectionService from '../../../../../common/services/ReflectionService';
import TraceService from '../../../../../common/services/TraceService';

@Injectable()
export default class JwtService {

    @Inject()
    private readonly _authConfigService: AuthConfigService;

    @Inject()
    private readonly _authenticationService: AuthenticationService;

    @Inject()
    private readonly _dateService: DateService;

    @Inject()
    private readonly _reflectionService: ReflectionService;

    @Inject()
    private readonly _flowService: FlowService;

    @Inject()
    private readonly _traceService: TraceService;

    async login(credential: AuthenticationDto, parentProcess?: any): Promise<JwtTokenDto> {
        // const token = new JwtTokenDto();
        // if (credential) {
        //     const jwtConfig = this._authConfigService.jwt;
        //     const loginResult = await this._authenticationService.login(credential);
        //     token.access_token = await this._createAccessToken(credential, loginResult);
        //     token.refresh_token = await this._createRefreshToken(credential, loginResult);
        //     token.expires_in = this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL);
        // }
        // return token;
        const id = this._reflectionService.name(this) + '/login';
        return this._traceService.trace(id, async (span) => {
            const token = new JwtTokenDto();
            if (credential) {
                const jwtConfig = this._authConfigService.jwt;
                const loginResult = await this._authenticationService.login(credential, span);

                const processes = [
                    this._createAccessToken(credential, loginResult, span),
                    this._createRefreshToken(credential, loginResult, span)
                ];
                const responses = await this._flowService.each(processes, promise => {
                    return promise;
                });
                token.access_token = responses[0];
                token.refresh_token = responses[1];
                // token.access_token = await this._createAccessToken(credential, loginResult, span);
                // token.refresh_token = await this._createRefreshToken(credential, loginResult, span);
                token.expires_in = this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL);
            }
            return token;
        }, parentProcess);
    }

    createToken(createTokenDto: JwtCreateTokenDto, parentContext?): Promise<string> {
        // let token: string;
        // if (createTokenDto) {
        //     const jwtConfig = this._authConfigService.jwt;
        //     const jwtOptions = {
        //         issuer: createTokenDto.option.issuer || jwtConfig.issuer,
        //         subject: createTokenDto.option.subject,
        //         audience: createTokenDto.option.audience,
        //         expiresIn: createTokenDto.option.ttl,
        //         algorithm: jwtConfig.encryption
        //     };
        //     const privateKey = jwtConfig.privatekey;
        //     token = await jwt.sign(createTokenDto.payload, privateKey, jwtOptions);
        // }
        // return token;
        const id = this._reflectionService.name(this) + '/createToken';
        return this._traceService.trace(id, async (span) => {
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
                span.setTag('jwt-option', jwtOptions);
                span.setTag('jwt-payload', createTokenDto.payload);
                token = await jwt.sign(createTokenDto.payload, privateKey, jwtOptions);
            }
            return token;
        }, parentContext);
    }

    private _createAccessToken(credential: AuthenticationDto, loginResult: AuthenticationResultDto, parentContext?): Promise<string> {
        const jwtConfig = this._authConfigService.jwt;
        const jwtPayload = {
            clientId: credential.clientId,
            displayName: loginResult.displayName,
            groups: loginResult.groups
        };
        const accessToken = this.createToken({
            payload: jwtPayload,
            option: {
                issuer: jwtConfig.issuer,
                subject: credential.username,
                audience: credential.username,
                ttl: this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL)
            }
        }, parentContext);
        return accessToken;
    }

    private async _createRefreshToken(credential: AuthenticationDto, loginResult: AuthenticationResultDto, parentContext?): Promise<string> {
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
        }, parentContext);
        return accessToken;
    }
}