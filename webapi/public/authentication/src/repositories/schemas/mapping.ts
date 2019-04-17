import TableNames from './TableNames';
import ApplicationSchema from './ApplicationSchema';
import UserSchema from './UserSchema';

const mapping = [
    { name: TableNames.application, schema: ApplicationSchema },
    { name: TableNames.user, schema: UserSchema }
];
export default mapping;