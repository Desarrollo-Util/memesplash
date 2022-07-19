import { DomainFormatException } from './domain-format.exception.js';

export class InvalidImageFormatException extends DomainFormatException {
    constructor() {
        super('Formato de imagen inválido');
    }
}
