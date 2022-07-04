import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from '../value-object.js';

export class PlainPasswordVO extends ValueObject {
    equals(valueObject) {
        return this.value === valueObject.value;
    }

    assertIsValid(value) {
        if (value.length < 8 && value.length > 30 && value.includes(' ')) {
            throw new VOFormatException(PlainPasswordVO.name, value);
        }
    }
}
