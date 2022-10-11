import { ImageModel } from '../models/image.model';
import { UrlSlugVO } from '../value-objects/url-slug.vo';
import { UuidVO } from '../value-objects/uuid.vo';

/**
 * Image repository interface
 */
export interface IImageRepository {
    /**
     * Finds a image by id
     * @param id Image id
     * @returns Domain image
     */
    findById(id: UuidVO): Promise<ImageModel | null>;

    /**
     * Finds a image by slug
     * @param slug Image slug
     * @returns Domain image
     */
    findBySlug(slug: UrlSlugVO): Promise<ImageModel | null>;

    /**
     * Finds images by ownerId
     * @returns Domain images array
     */
    findAll(): Promise<ImageModel[]>;

    /**
     * Finds images by ownerId
     * @param ownerId Image owner Id
     * @returns Domain images array
     */
    findByOwnerId(ownerId: UuidVO): Promise<ImageModel[]>;

    /**
     * Persists a new image
     * @param domainImage Domain image
     */
    create(domainImage: ImageModel): Promise<void>;
}
