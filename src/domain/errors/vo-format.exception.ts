import { DomainFormatException } from './domain-format.exception';

export class VOFormatException extends DomainFormatException {
    constructor(constructorName: string, value: any) {
        super(`${constructorName}: Invalid value ${JSON.stringify(value)}`);
    }
}
