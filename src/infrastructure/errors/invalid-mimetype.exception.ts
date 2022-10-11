import { InfrastructureFormatException } from './infrastructure-format.exception';

export class InvalidMimetypeFormatException extends InfrastructureFormatException {
    constructor() {
        super('Formato de imagen incorrecto');
    }
}
