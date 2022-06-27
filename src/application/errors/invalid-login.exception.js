import { ApplicationUnauthorizedException } from './application-unauthorized.exception.js';

export class InvalidLoginException extends ApplicationUnauthorizedException {
    constructor() {
        super('Credenciales incorrectas');
    }
}
