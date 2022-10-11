import { ApplicationUnauthorizedException } from './application-unauthorized.exception';

export class InvalidLoginException extends ApplicationUnauthorizedException {
    constructor() {
        super('Credenciales incorrectas');
    }
}
