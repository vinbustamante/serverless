import * as mongoose from 'mongoose';
import repositoryTypes from '../repositoryTypes';

const mongoDbConnectionFactory = [
    {
        provide: repositoryTypes.mongoDbConnection,
        //useFactory: (): Promise<typeof mongoose> => {
        useFactory: (): Promise<any> => {
            //return mongoose.connect('mongodb://localhost/local-sats-authentication', {poolSize: 4, autoIndex: false, useNewUrlParser: true });
            return mongoose.createConnection('mongodb://localhost/local-sats-authentication', {poolSize: 4, autoIndex: false, useNewUrlParser: true });
        }
    }
]
export default mongoDbConnectionFactory;