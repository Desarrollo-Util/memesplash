import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class TitleVO extends ValueObject<string> {
    public equals(valueObject: TitleVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (value.length < 3 || value.length > 140) {
            throw new VOFormatException(TitleVO.name, value);
        }
    }
}
