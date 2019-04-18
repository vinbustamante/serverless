export default class JwtCreateTokenDto {    
    payload: any;
    option: {
        issuer?: string;
        subject: string;
        audience: string;
        ttl: string;
    }
}