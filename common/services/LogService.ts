import { Injectable, Inject } from '@nestjs/common';
import LogType from '../enum/LogType';
import UtilService from './UtilService';

@Injectable()
export default class LogService {

    @Inject()
    private _utilService: UtilService;

    log(logType: LogType, message: any): Promise<void> {
        if (logType === LogType.error) {
            return this.error(message);
        } else if (logType === LogType.warning) {
            return this.warning(message);
        } else {
            return this.info(message);
        }
    }

    info(message: any): Promise<void> {
        let payload = this._utilService.toJson(message);
        console.info(payload);
        return Promise.resolve();
    }

    error(message: any): Promise<void> {
        console.error(message);
        return Promise.resolve();
    }

    warning(message: any): Promise<void> {
        let payload = this._utilService.toJson(message);
        console.warn(payload);
        return Promise.resolve();
    }
}