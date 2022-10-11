import { ImageFormats } from '../constants/image-formats.enum.js';
import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from './value-object.js';

export class ImageFormatVO extends ValueObject<ImageFormats> {
    public equals(valueObject: ImageFormatVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: ImageFormats) {
        if (!Object.values(ImageFormats).includes(value)) {
            throw new VOFormatException(ImageFormatVO.name, value);
        }
    }

    public static createJPG() {
        return new ImageFormatVO(ImageFormats.JPG);
    }

    public static createPNG() {
        return new ImageFormatVO(ImageFormats.PNG);
    }

    public static createGIF() {
        return new ImageFormatVO(ImageFormats.GIF);
    }
}
