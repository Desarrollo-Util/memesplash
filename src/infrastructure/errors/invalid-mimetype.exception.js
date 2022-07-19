import { InfrastructureFormatException } from './infrastructure-format.exception.js';

export class InvalidMimetypeFormatException extends InfrastructureFormatException {
    constructor() {
        super('Formato de imagen incorrecto');
    }
}
