import { DomainFormatException } from './domain-format.exception';

export class InvalidImageFormatException extends DomainFormatException {
    constructor() {
        super('Formato de imagen inválido');
    }
}
