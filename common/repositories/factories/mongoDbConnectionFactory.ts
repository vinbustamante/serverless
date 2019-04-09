import * as mongoose from 'mongoose';
import repositoryTypes from '../repositoryTypes';

const mongoDbConnectionFactory = [
    {
        provide: repositoryTypes.mongoDbConnection,
        useFactory: async (): Promise<typeof mongoose> => {
            return await mongoose.connect('mongodb://localhost/local-sats-authentication');
        }
    }
]
export default mongoDbConnectionFactory;