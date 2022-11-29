import { VOFormatException } from '@shared/domain/errors/vo-format.exception';
import { ValueObject } from '@shared/domain/value-objects/value-object';
import { ImageFormats } from '../constants/image-formats.enum';

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
