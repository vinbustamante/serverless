import { SetMetadata } from '@nestjs/common';
import MetaDataKey from '../enum/MetaDataKey';

const name = (friendName: string) => SetMetadata(MetaDataKey.name, friendName);
export default name;