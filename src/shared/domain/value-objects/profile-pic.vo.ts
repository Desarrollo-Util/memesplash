import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class ProfilePicVO extends ValueObject<string> {
    public equals(valueObject: ProfilePicVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        // TODO: Rewrite this
        if (value.length < 3 || value.length > 140) {
            throw new VOFormatException(ProfilePicVO.name, value);
        }
    }
}
