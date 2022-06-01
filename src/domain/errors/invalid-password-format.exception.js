import { DomainFormatException } from './domain-format.exception';

export class InvalidPasswordFormatException extends DomainFormatException {
    constructor() {
        super('Formato de contraseña inválido');
    }
}
