import { Injectable } from '@nestjs/common';
import moment = require('moment-timezone');
import * as _ from 'underscore';

@Injectable()
export default class DateService {

    getCurrentUtcDate(): Date {
        return new Date(moment.utc().valueOf());
    }

    toUtcDate(date: any): Date {
        let convertedDate: Date;
        if(_.isNumber(date)) {
            convertedDate = new Date(date);
        } else if(_.isDate(date)) {
            convertedDate = date;
        } else if(_.isString(date)) {
            convertedDate = moment(date).toDate();
        }
        return convertedDate;
    }

    /*************************************************\
      * TIMESPAN CAN BE PASS IN THE FOLLOWING FORMAT
      *
      * Format. <NUMERIC><INTERVAL>
      * SUPPORTED CONVERSION
      *             D - DAYS
      *             H - HOURS
      *             M - MINUTES
      *             S - SECONDS
    \**************************************************/
    add(date: any, timespan: string): Date {
        let interval: any = 0;
        let convertedDate: any = this.toUtcDate(date);
        if(_.isString(timespan)) {
            interval = parseInt(timespan);
            if(_.isNumber(interval)) {
                let stringValue = (""+interval);
                if((stringValue.length + 1) === timespan.length) {
                    //EXTRACT WHAT CONVERSION IS REQUESTED
                    var conversion = timespan.substr(stringValue.length).toLowerCase();
                    convertedDate = moment(date).add(interval as any, conversion).utc().toDate();
                }
            }
        }
        return convertedDate;
    }
}