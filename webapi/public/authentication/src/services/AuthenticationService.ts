import { Injectable, Inject } from '@nestjs/common';
import BaseService from '../../../../../common/services/BaseService';
import ApplicationService from './ApplicationService';
import UserService from './UserService';
import AuthenticationResultDto from './dto/AuthenticationResultDto';
import AuthenticationDto from './dto/AuthenticationDto';
import AuthenticationFailedException from '../../../../../common/services/exception/AuthenticationFailedException';

@Injectable()
export default class AuthenticationService extends BaseService {

    @Inject()
    private readonly _applicationService: ApplicationService;

    @Inject()
    private readonly _userService: UserService;
    
    getDtoClass(): Function {
        return AuthenticationResultDto;
    }

    async login(credential: AuthenticationDto): Promise<AuthenticationResultDto> {
        let result = new  AuthenticationResultDto();   
        result.isSuccess = false; 
        const [ isAppLoginSuccess ] = await this._appLogin(credential);
        if (isAppLoginSuccess === true) {
            const [ isUserLoginSuccess, userDto] = await this._userLogin(credential);
            if (isUserLoginSuccess === true) {
                result.isSuccess = true;
                result.username = credential.username;
                result.groups = userDto.groups;
            }
        }
        if (result.isSuccess === false) {
            throw new AuthenticationFailedException('Authentication failed');
        }
        return result;
    }

    private async _appLogin(credential: AuthenticationDto): Promise<any[]> {
        const applicationDto = await this._applicationService.getById(credential.clientId);
        return [applicationDto && applicationDto.isEnabled === true && applicationDto.clientSecret === credential.clientSecret, applicationDto];
    }

    private async _userLogin(credential: AuthenticationDto): Promise<any[]> {
        const userDto = await this._userService.getByUsername(credential.username);
        return [userDto && userDto.isEnabled === true && userDto.password === credential.password, userDto];
    }
}