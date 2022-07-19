import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

const NAME_REGEX =
    /^(?![\s-'])(?!.*[\s-']{2})(?!.*[\s-']$)[A-ZÀ-ÖØ-öø-ÿ\s-']{2,30}$/i;

export class NameVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof NameVO && this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (!NAME_REGEX.test(value)) {
            throw new VOFormatException(NameVO.name, value);
        }
    }
}
