import { InfrastructureFormatException } from './infrastructure-format.exception.js';

export class UnnecesaryFieldsFormatException extends InfrastructureFormatException {
    constructor() {
        super('Existen campos sobrantes');
    }
}
