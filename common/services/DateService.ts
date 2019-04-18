import { Injectable } from '@nestjs/common';
import moment = require('moment-timezone');
import * as _ from 'underscore';

@Injectable()
export default class DateService {

    private readonly _timespanMap = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400
    };


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

    timespanToSeconds(timespan: string): number {
        let seconds = 0;
        if (timespan) {
            const num = parseInt(timespan);
            const span = timespan.replace(num.toString(), '').trim();
            let multiplier = 1;
            if (span) {
                multiplier = this._timespanMap[span.toLowerCase()];
            }
            seconds = num * multiplier;
        }
        return seconds;
    }
}