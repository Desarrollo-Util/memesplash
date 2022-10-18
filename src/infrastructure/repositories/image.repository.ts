import { injectable } from 'inversify';
import { ImageModel } from '../../domain/models/image.model';
import { IImageRepository } from '../../domain/repository/image-repository.interface';
import { ImageFormatVO } from '../../domain/value-objects/image-format.vo';
import { IntGtZeroVO } from '../../domain/value-objects/int-gt-zero.vo';
import { PreviousDateVO } from '../../domain/value-objects/previous-date.vo';
import { TitleVO } from '../../domain/value-objects/title.vo';
import { UrlSlugVO } from '../../domain/value-objects/url-slug.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ImageSchema } from '../schemas/image.schema';
import { IImage } from '../types/schemas/image-doc.interface';

/**
 * Image MongoDB repository implementation
 */
@injectable()
export class ImageRepository implements IImageRepository {
    /**
     * Transforms a database image into a domain image
     * @param persistanceImage Database image
     * @returns Domain image
     */
    private toDomain(persistanceImage: IImage) {
        const {
            _id,
            ownerId,
            title,
            slug,
            format,
            size,
            height,
            width,
            createdAt,
        } = persistanceImage;

        return new ImageModel(
            new UuidVO(_id),
            new UuidVO(ownerId),
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
     * @param domainImage Domain image
     * @returns Database image
     */
    private toPersistance(domainImage: ImageModel) {
        const {
            id,
            ownerId,
            title,
            slug,
            format,
            size,
            height,
            width,
            createdAt,
        } = domainImage;

        return {
            _id: id.value,
            ownerId: ownerId.value,
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
     * @param id Image id
     * @returns Domain image
     */
    async findById(id: UuidVO): Promise<ImageModel | null> {
        const imageFound = await ImageSchema.findById(id.value).exec();

        if (!imageFound) return null;

        return this.toDomain(imageFound);
    }

    /**
     * Finds a image by slug
     * @param slug Image slug
     * @returns Domain image
     */
    async findBySlug(slug: UrlSlugVO): Promise<ImageModel | null> {
        const imageFound = await ImageSchema.findOne({
            slug: slug.value,
        }).exec();

        if (!imageFound) return null;

        return this.toDomain(imageFound);
    }

    /**
     * Finds images by ownerId
     * @returns Domain images array
     */
    async findAll(): Promise<ImageModel[]> {
        const ownerImages = await ImageSchema.find().exec();

        return ownerImages.map((image) => this.toDomain(image));
    }

    /**
     * Finds images by ownerId
     * @param ownerId Image owner Id
     * @returns Domain images array
     */
    async findByOwnerId(ownerId: UuidVO): Promise<ImageModel[]> {
        const ownerImages = await ImageSchema.find({
            ownerId: ownerId.value,
        }).exec();

        return ownerImages.map((image) => this.toDomain(image));
    }

    /**
     * Persists a new image
     * @param domainImage Domain image
     */
    async create(domainImage: ImageModel): Promise<void> {
        const persistanceImage = this.toPersistance(domainImage);

        const image = new ImageSchema(persistanceImage);

        await image.save();
    }
}
