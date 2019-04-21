import { excludeForAudit } from '../../../../../../common/decorator/excludeForAudit';

@excludeForAudit()
export default class JwtTokenDto {   
    access_token: string;
    refresh_token: string;
    expires_in: number;
}