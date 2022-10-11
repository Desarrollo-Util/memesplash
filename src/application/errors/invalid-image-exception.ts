import { ApplicationUnauthorizedException } from './application-unauthorized.exception';

export class InvalidImageException extends ApplicationUnauthorizedException {
    constructor() {
        super('La imagen no es válida');
    }
}
