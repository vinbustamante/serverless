import { IsString, IsNotEmpty } from 'class-validator';
import { excludeForAudit } from '../../../../../common/decorator/excludeForAudit';

export default class UserAuthenticationViewModel {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @excludeForAudit()
    @IsString()
    @IsNotEmpty()
    clientSecret: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @excludeForAudit()
    @IsString()
    @IsNotEmpty()
    password: string;
}