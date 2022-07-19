import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class PreviousDateVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof PreviousDateVO &&
            this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (
            !(value instanceof Date) ||
            value.getTime() > new Date().getTime()
        ) {
            throw new VOFormatException(PreviousDateVO.name, value);
        }
    }
}
