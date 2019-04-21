import { excludeForAudit } from '../../../../../../common/decorator/excludeForAudit';

export default class AuthenticationDto {
    clientId: string;
    @excludeForAudit()
    clientSecret: string;
    username: string;
    @excludeForAudit()
    password: string;
}