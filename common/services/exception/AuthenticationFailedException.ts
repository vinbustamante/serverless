import ServiceException from './ServiceException';

export default class AuthenticationFailedException extends ServiceException {

    getStatus() {
        return 401;
    }

}