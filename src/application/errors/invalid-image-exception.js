import { ApplicationUnauthorizedException } from './application-unauthorized.exception.js';

export class InvalidImageException extends ApplicationUnauthorizedException {
    constructor() {
        super('La imagen no es válida');
    }
}
