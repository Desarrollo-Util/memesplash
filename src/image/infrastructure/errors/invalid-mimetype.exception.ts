import { InfrastructureFormatException } from '../../../shared/infrastructure/errors/infrastructure-format.exception';

export class InvalidMimetypeFormatException extends InfrastructureFormatException {
    constructor() {
        super('Formato de imagen incorrecto');
    }
}
