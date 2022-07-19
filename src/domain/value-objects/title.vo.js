import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class TitleVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof TitleVO && this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (
            typeof value !== 'string' ||
            value.length < 3 ||
            value.length > 140
        ) {
            throw new VOFormatException(TitleVO.name, value);
        }
    }
}
