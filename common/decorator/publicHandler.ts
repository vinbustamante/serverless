import { SetMetadata } from '@nestjs/common';
import MetaDataKey from '../enum/MetaDataKey';

const publicHandler = () => SetMetadata(MetaDataKey.publicHandler, true);
export default publicHandler;