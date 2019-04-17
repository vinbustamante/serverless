import * as mongoose from 'mongoose';
import TableNames from './tableNames';

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    },
    groups: {
        type: Array<String>(),
        required: true
    },
}, { collection: TableNames.user });
export default UserSchema;