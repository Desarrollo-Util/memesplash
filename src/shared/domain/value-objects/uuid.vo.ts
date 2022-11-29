import { test } from 'uuid-random';
import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class UuidVO extends ValueObject<string> {
    public equals(valueObject: UuidVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (!test(value)) {
            throw new VOFormatException(UuidVO.name, value);
        }
    }
}
