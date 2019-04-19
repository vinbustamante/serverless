import { SetMetadata } from '@nestjs/common';
import MetaDataKey from '../enum/MetaDataKey';

export const excludeForAudit = () => SetMetadata(MetaDataKey.excludeForAudit, true);
export const excludeRequestBodyForAudit = () => SetMetadata(MetaDataKey.excludeRequestBodyForAudit, true);
export const excludeResponseBodyForAudit = () => SetMetadata(MetaDataKey.excludeResponseBodyForAudit, true);