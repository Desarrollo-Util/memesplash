import { IMAGE_FORMATS } from '../constants/image-format.constant.js';
import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class ImageFormatVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof ImageFormatVO &&
            this.value === valueObject.value
        );
    }

    assertIsValid(value) {
        if (!Object.values(IMAGE_FORMATS).includes(value)) {
            throw new VOFormatException(ImageFormatVO.name, value);
        }
    }

    static createJPG() {
        return new ImageFormatVO(IMAGE_FORMATS.JPG);
    }

    static createPNG() {
        return new ImageFormatVO(IMAGE_FORMATS.PNG);
    }

    static createGIF() {
        return new ImageFormatVO(IMAGE_FORMATS.GIF);
    }
}
