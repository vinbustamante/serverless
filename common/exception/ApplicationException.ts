import * as _ from 'underscore';

export default class ApplicationException extends Error {

    private _innerException: ApplicationException;

    constructor(ex?: any) {        
        if (ex instanceof ApplicationException) {
            super(ex.message);
            this._innerException = ex;
        } else {
            super(ex);
        }
    }

    get innerException() {
        return this._innerException;
    }
}