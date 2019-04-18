import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import AuthConfigService from './AuthConfigService';
import JwtCreateTokenDto from './dto/JwtCreateTokenDto';

@Injectable()
export default class JwtService {

    @Inject()
    private readonly _authConfig: AuthConfigService;

    async createToken(createTokenDto: JwtCreateTokenDto): Promise<string> {
        let token: string;
        if (createTokenDto) {
            const jwtConfig = this._authConfig.jwt;
            const jwtOptions = {
                issuer: createTokenDto.option.issuer || jwtConfig.issuer,
                subject: createTokenDto.option.subject,
                audience: createTokenDto.option.audience,
                expiresIn: createTokenDto.option.ttl,
                algorithm: jwtConfig.encryption
            };
            let privateKey = jwtConfig.privatekey;
            token = await jwt.sign(createTokenDto.payload, privateKey, jwtOptions);
        }
        return token;
    }
}