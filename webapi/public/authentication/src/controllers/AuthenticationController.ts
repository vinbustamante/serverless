import * as mongoose from 'mongoose';
import { Controller, Get, HttpCode, Post, Body, Inject } from '@nestjs/common';
import UserAuthenticationViewModel from '../viewModels/UserAuthenticationViewModel';
//import repositoryTypes from '../../../../../common/repositories/repositoryTypes';
import ApplicationRepository from '../repositories/ApplicationRepository';
import { HttpException } from '@nestjs/common';
import ApplicationException from '../../../../../common/exception/ApplicationException';

@Controller('authentication')
export default class AuthenticationController {

    // @Inject(repositoryTypes.mongoDbConnection)    
    // private _db: mongoose.Connection;

    @Inject()
    private _applicationRepository: ApplicationRepository;

    @Post()
    async createToken(@Body() credential: UserAuthenticationViewModel) {
        const application = await this._applicationRepository.getById('satscc-dashboard');
        throw new ApplicationException('helo world');
        console.log('***************************');
        console.log(application);
        console.log('***************************');

    }
    
}