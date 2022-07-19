import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

const URL_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class UrlSlugVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof UrlSlugVO && this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (!URL_SLUG_REGEX.test(value)) {
            throw new VOFormatException(UrlSlugVO.name, value);
        }
    }
}
