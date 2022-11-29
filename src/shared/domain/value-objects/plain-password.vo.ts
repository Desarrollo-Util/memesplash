import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class PlainPasswordVO extends ValueObject<string> {
    public equals(valueObject: PlainPasswordVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (value.length < 8 && value.length > 30 && value.includes(' ')) {
            throw new VOFormatException(PlainPasswordVO.name, value);
        }
    }
}
