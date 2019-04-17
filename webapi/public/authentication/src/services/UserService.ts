import { Injectable, Inject } from '@nestjs/common';
import UserDto from './dto/UserDto';
import BaseService from '../../../../../common/services/BaseService';
import UserRepository from '../repositories/UserRepository';

@Injectable()
export default class UserService extends BaseService  {

    @Inject()
    private readonly _userRepository: UserRepository;

    getDtoClass(): Function {
        return UserDto;
    }

    async getByUsername(username: string): Promise<UserDto> {       
        const applicationModel = await this._userRepository.getByUsername(username);
        return this.toDto(applicationModel);
    }
}