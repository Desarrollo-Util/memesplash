import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailVO extends ValueObject<string> {
    public equals(valueObject: EmailVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (!EMAIL_REGEX.test(value)) {
            throw new VOFormatException(EmailVO.name, value);
        }
    }
}
