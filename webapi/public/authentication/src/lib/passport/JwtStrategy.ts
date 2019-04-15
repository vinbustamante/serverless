import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthService from '../../services/AuthService';
import JwtPayloadDto from '../../services/dto/JwtPayloadDto';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
  constructor(private readonly authService: AuthService) {    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //passReqToCallback: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JwtPayloadDto) {
    console.log('***************************');
    console.log('JwtStrategy validate');
    console.log('***************************');
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}