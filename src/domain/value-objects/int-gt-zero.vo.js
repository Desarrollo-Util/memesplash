import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class IntGtZeroVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof IntGtZeroVO &&
            this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (
            typeof value !== 'number' ||
            value < 0 ||
            !Number.isInteger(value)
        ) {
            throw new VOFormatException(IntGtZeroVO.name, value);
        }
    }
}
