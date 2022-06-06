import { DomainFormatException } from './domain-format.exception.js';

export class InvalidIdFormatException extends DomainFormatException {
    constructor() {
        super('Formato de ID inválido');
    }
}
