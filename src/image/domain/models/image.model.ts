import { ImageFormatVO } from '@image/domain/value-objects/image-format.vo';
import { IntGtZeroVO } from '@shared/domain/value-objects/int-gt-zero.vo';
import { PreviousDateVO } from '@shared/domain/value-objects/previous-date.vo';
import { TitleVO } from '@shared/domain/value-objects/title.vo';
import { UrlSlugVO } from '@shared/domain/value-objects/url-slug.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';

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
