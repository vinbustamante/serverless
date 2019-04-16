// import { Document } from 'mongoose';

// export default interface ApplicationModel extends Document {
//     id: string;
//     clientId: string;
//     clientSecret: string;
//     displayName: string;
//     isEnabled: boolean;
// }

export default class ApplicationModel {
    id: string;
    clientId: string;
    clientSecret: string;
    displayName: string;
    isEnabled: boolean;
}