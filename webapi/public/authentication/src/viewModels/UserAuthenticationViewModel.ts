import { IsString, IsNotEmpty } from 'class-validator';

export default class UserAuthenticationViewModel {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsString()
    @IsNotEmpty()
    clientSecret: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}