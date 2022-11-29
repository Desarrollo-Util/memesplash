import { ApplicationUnauthorizedException } from '@shared/application/errors/application-unauthorized.exception';

export class InvalidImageException extends ApplicationUnauthorizedException {
    constructor() {
        super('La imagen no es válida');
    }
}
