export default class JwtConfigDto {
    issuer: string;
    encryption: string;
    privatekey: string;
    publickey: string;
    accessTokenTTL: string;
    refreshTokenTTL: string;
}