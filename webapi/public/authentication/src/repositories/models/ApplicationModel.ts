import table from '../../../../../../common/repositories/decorator/table';

@table('application')
export default class ApplicationModel {
    id: string;
    clientId: string;
    clientSecret: string;
    displayName: string;
    isEnabled: boolean;
}