import { DomainFormatException } from './domain-format.exception';

export class InvalidEmailFormatException extends DomainFormatException {
    constructor() {
        super('Formato de email inválido');
    }
}
