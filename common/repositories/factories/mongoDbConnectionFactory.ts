import * as mongoose from 'mongoose';
import repositoryTypes from '../repositoryTypes';

const mongoDbConnectionFactory = [
    {
        provide: repositoryTypes.mongoDbConnection,
        useFactory: (): Promise<typeof mongoose> => {
            return mongoose.connect('mongodb://localhost/local-sats-authentication');
        }
    }
]
export default mongoDbConnectionFactory;