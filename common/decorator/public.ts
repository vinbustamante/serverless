import { SetMetadata } from '@nestjs/common';
import MetaDataKey from '../enum/MetaDataKey';

const Public = () => SetMetadata(MetaDataKey.publicHandler, true);
export default Public;