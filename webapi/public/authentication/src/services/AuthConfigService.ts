import { Injectable, Inject } from '@nestjs/common';
import ConfigService from '../../../../../common/services/ConfigService';
import UtilService from '../../../../../common/services/UtilService';
import JwtConfigDto from './dto/JwtConfigDto';

@Injectable()
export default class AuthConfigService {

    @Inject()
    private readonly _configService: ConfigService;

    @Inject()
    private readonly _utilService: UtilService;

    get jwt(): JwtConfigDto {
        const privateKey = this._utilService.decodeBase64(this._configService.getValue('jwt.key.private'));
        const publicKey = this._utilService.decodeBase64(this._configService.getValue('jwt.key.public'));
        const config: JwtConfigDto = {
            issuer: this._configService.getValue('jwt.issuer'),
            encryption: this._configService.getValue('jwt.encryption'),
            privatekey: privateKey,
            publickey: publicKey,
            accessTokenTTL: this._configService.getValue('jwt.ttl.accessToken'),
            refreshTokenTTL: this._configService.getValue('jwt.ttl.refreshToken')
        };
        return config;
    }
}