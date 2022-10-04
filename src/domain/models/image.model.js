import { InvalidImageFormatException } from '../errors/invalid-image-format.exception.js';
import { ImageFormatVO } from '../value-objects/image-format.vo.js';
import { IntGtZeroVO } from '../value-objects/int-gt-zero.vo.js';
import { PreviousDateVO } from '../value-objects/previous-date.vo.js';
import { TitleVO } from '../value-objects/title.vo.js';
import { UrlSlugVO } from '../value-objects/url-slug.vo.js';
import { UuidVO } from '../value-objects/uuid.vo.js';

/**
 * Image uploaded in the application
 */
export class ImageModel {
    /**
     * Constructor
     * @param {UuidVO} id Image unique identifier
     * @param {UuidVO} ownerId Image owner unique identifier
     * @param {TitleVO} title Image title
     * @param {UrlSlugVO} slug Image filename
     * @param {ImageFormatVO} format Image format
     * @param {IntGtZeroVO} size Image size in bytes
     * @param {IntGtZeroVO} height Image height in pixels
     * @param {IntGtZeroVO} width Image width in pixels
     * @param {PreviousDateVO} createdAt Image creation date
     */
    constructor(
        id,
        ownerId,
        title,
        slug,
        format,
        size,
        height,
        width,
        createdAt
    ) {
        this.assertIsValid(
            id,
            ownerId,
            title,
            slug,
            format,
            size,
            height,
            width,
            createdAt
        );

        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.slug = slug;
        this.format = format;
        this.size = size;
        this.height = height;
        this.width = width;
        this.createdAt = createdAt;
    }

    assertIsValid(
        id,
        ownerId,
        title,
        slug,
        format,
        size,
        height,
        width,
        createdAt
    ) {
        if (
            !(id instanceof UuidVO) ||
            !(ownerId instanceof UuidVO) ||
            !(title instanceof TitleVO) ||
            !(slug instanceof UrlSlugVO) ||
            !(format instanceof ImageFormatVO) ||
            !(size instanceof IntGtZeroVO) ||
            !(height instanceof IntGtZeroVO) ||
            !(width instanceof IntGtZeroVO) ||
            !(createdAt instanceof PreviousDateVO)
        )
            throw new InvalidImageFormatException();
    }
}
