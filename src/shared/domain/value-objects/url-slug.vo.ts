import { ValueObject } from './value-object';

const URL_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class UrlSlugVO extends ValueObject<string> {
    public equals(valueObject: UrlSlugVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        return true
        // TODO: Validation
        // if (!URL_SLUG_REGEX.test(value)) {
        //     throw new VOFormatException(UrlSlugVO.name, value);
        // }
    }
}
