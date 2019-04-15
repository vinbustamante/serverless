import * as mongoose from 'mongoose';
import { Controller, Get, UseGuards, Post, Catch, HttpException } from '@nestjs/common';
import { AppService } from '../services/app.service';
import AuthService from '../services/AuthService';
//import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
//import { callback } from '../lib/passport/JwtStrategy';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard())
  @Get()
  //@UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }
}
