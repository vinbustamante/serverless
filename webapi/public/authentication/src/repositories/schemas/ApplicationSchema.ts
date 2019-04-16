import * as mongoose from 'mongoose';
import TableNames from './tableNames';

const ApplicationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    clientId: {
        type: String,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    }
}, { collection: TableNames.application });
export default ApplicationSchema;