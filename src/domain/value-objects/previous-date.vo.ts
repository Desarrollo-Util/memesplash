import { VOFormatException } from '../errors/vo-format.exception';
import { ValueObject } from './value-object';

export class PreviousDateVO extends ValueObject<Date> {
    public equals(valueObject: PreviousDateVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: Date) {
        if (value.getTime() > new Date().getTime()) {
            throw new VOFormatException(PreviousDateVO.name, value);
        }
    }
}
