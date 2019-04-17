import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class JwtService {

    async createToken(payload: any): Promise<string> {
        let token: string;
        if (payload) {
            
        }
        return token;
    }

    private _getJwtOption(subject: string, ttl: string) {
        return {
            issuer:  'tigerspike',
            subject:  subject,
            audience:  this._configService.getProjectName(),
            expiresIn:  ttl,
            algorithm: this._configService.gettAuthEncryptionAlgorithm()
        };
    }
}