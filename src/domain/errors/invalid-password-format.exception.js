import { DomainFormatException } from './domain-format.exception.js';

export class InvalidPasswordFormatException extends DomainFormatException {
    constructor() {
        super('Formato de contraseña inválido');
    }
}
