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
     * @param id Image unique identifier
     * @param ownerId Image owner unique identifier
     * @param title Image title
     * @param slug Image filename
     * @param format Image format
     * @param size Image size in bytes
     * @param height Image height in pixels
     * @param width Image width in pixels
     * @param createdAt Image creation date
     */
    constructor(
        public readonly id: UuidVO,
        public ownerId: UuidVO,
        public title: TitleVO,
        public slug: UrlSlugVO,
        public format: ImageFormatVO,
        public size: IntGtZeroVO,
        public height: IntGtZeroVO,
        public width: IntGtZeroVO,
        public createdAt: PreviousDateVO
    ) {}
}
