import { Injectable } from '@nestjs/common';
import JwtPayloadDto from './dto/JwtPayloadDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    async validateUser(payload: JwtPayloadDto): Promise<any> {
        return {
            id: 1,
            username: 'marvin'
        };
    }

    async createToken() {
        const user: JwtPayloadDto = { email: 'test@email.com' };
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn: 3600,
          accessToken,
        };
      }

}