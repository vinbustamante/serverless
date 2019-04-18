import { Injectable } from '@nestjs/common';
import moment = require('moment-timezone');

@Injectable()
export default class DateService {

    getCurrentUtcDate(): number {
        return moment.utc().valueOf();
    }


}