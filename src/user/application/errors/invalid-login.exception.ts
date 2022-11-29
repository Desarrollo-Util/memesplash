import { ApplicationUnauthorizedException } from '@shared/application/errors/application-unauthorized.exception';

export class InvalidLoginException extends ApplicationUnauthorizedException {
    constructor() {
        super('Credenciales incorrectas');
    }
}
