import { createParamDecorator, SetMetadata } from '@nestjs/common';
import commonConstant from '../../commonConstant';

export default function table(name) {
    return SetMetadata(commonConstant.TableName, name);
}