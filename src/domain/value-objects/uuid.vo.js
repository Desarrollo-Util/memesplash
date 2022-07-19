import uuid from 'uuid-random';
import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class UuidVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof UuidVO && this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (!uuid.test(value)) {
            throw new VOFormatException(UuidVO.name, value);
        }
    }
}
