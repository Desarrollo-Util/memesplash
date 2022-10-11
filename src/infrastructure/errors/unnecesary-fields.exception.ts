import { InfrastructureFormatException } from './infrastructure-format.exception';

export class UnnecesaryFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Existen campos sobrantes');
    }
}
