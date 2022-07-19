import { ImageModel } from '../../domain/models/image.model.js';
import { ImageFormatVO } from '../../domain/value-objects/image-format.vo.js';
import { IntGtZeroVO } from '../../domain/value-objects/int-gt-zero.vo.js';
import { PreviousDateVO } from '../../domain/value-objects/previous-date.vo.js';
import { TitleVO } from '../../domain/value-objects/title.vo.js';
import { UrlSlugVO } from '../../domain/value-objects/url-slug.vo.js';
import { UuidVO } from '../../domain/value-objects/uuid.vo.js';
import { ImageSchema } from '../schemas/image.schema.js';

/**
 * Image MongoDB repository implementation
 */
export class ImageRepository {
    /**
     * Transforms a database image into a domain image
     * @param {*} persistanceImage Database image
     * @returns Domain image
     */
    toDomain(persistanceImage) {
        const { _id, title, slug, format, size, height, width, createdAt } =
            persistanceImage;

        return new ImageModel(
            new UuidVO(_id),
            new TitleVO(title),
            new UrlSlugVO(slug),
            new ImageFormatVO(format),
            new IntGtZeroVO(size),
            new IntGtZeroVO(height),
            new IntGtZeroVO(width),
            new PreviousDateVO(createdAt)
        );
    }

    /**
     * Transforms a domain image into a database image
     * @param {ImageModel} domainImage Domain image
     * @returns Database image
     */
    toPersistance(domainImage) {
        const { id, title, slug, format, size, height, width, createdAt } =
            domainImage;

        return {
            _id: id.value,
            title: title.value,
            slug: slug.value,
            format: format.value,
            size: size.value,
            height: height.value,
            width: width.value,
            createdAt: createdAt.value,
        };
    }

    /**
     * Finds a image by id
     * @param {String} id Image id
     * @returns Domain image
     */
    async findById(id) {
        const imageFound = await ImageSchema.findById(id.value).exec();

        if (!imageFound) return null;

        return this.toDomain(imageFound);
    }

    /**
     * Finds a image by slug
     * @param {String} slug Image slug
     * @returns Domain image
     */
    async findBySlug(slug) {
        const imageFound = await ImageSchema.findOne({
            slug: slug.value,
        }).exec();

        if (!imageFound) return null;

        return this.toDomain(imageFound);
    }

    /**
     * Persists a new image
     * @param {ImageModel} domainImage Domain image
     */
    async create(domainImage) {
        const persistanceImage = this.toPersistance(domainImage);

        const image = new ImageSchema(persistanceImage);

        await image.save();
    }
}
