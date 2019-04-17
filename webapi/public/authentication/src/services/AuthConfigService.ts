import { Injectable, Inject } from '@nestjs/common';
import ConfigService from '../../../../../common/services/ConfigService';
import JwtConfigDto from './dto/JwtConfigDto';

@Injectable()
export default class AuthConfigService {

    @Inject()
    private readonly _configService: ConfigService;

    get async jwtConfig(): Promise<JwtConfigDto> {
        const config = new JwtConfigDto();
        return config;
    }
}