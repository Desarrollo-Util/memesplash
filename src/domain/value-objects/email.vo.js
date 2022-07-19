import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof EmailVO && this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (!EMAIL_REGEX.test(value)) {
            throw new VOFormatException(EmailVO.name, value);
        }
    }
}
