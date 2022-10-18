import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class IntGtZeroVO extends ValueObject<number> {
    public equals(valueObject: IntGtZeroVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: number) {
        if (value < 0 || !Number.isInteger(value)) {
            throw new VOFormatException(IntGtZeroVO.name, value);
        }
    }
}
