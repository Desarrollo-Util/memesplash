import { InfrastructureFormatException } from './infrastructure-format.exception';

export class MissingFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Faltan campos obligatorios');
    }
}
