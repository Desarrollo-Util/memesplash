import { VOFormatException } from '../../domain/errors/vo-format.exception.js';
import { ImageModel } from '../../domain/models/image.model.js';
import { ImageFormatVO } from '../../domain/value-objects/image-format.vo.js';
import { IntGtZeroVO } from '../../domain/value-objects/int-gt-zero.vo.js';
import { PreviousDateVO } from '../../domain/value-objects/previous-date.vo.js';
import { TitleVO } from '../../domain/value-objects/title.vo.js';
import { UrlSlugVO } from '../../domain/value-objects/url-slug.vo.js';
import { UuidVO } from '../../domain/value-objects/uuid.vo.js';
import { InvalidImageException } from '../errors/invalid-image-exception.js';

export class ImageUploadUseCase {
    constructor({ imageRepository }) {
        this.imageRepository = imageRepository;
    }

    async execute(id, ownerId, title, slug, format, size, height, width) {
        try {
            const imageId = new UuidVO(id);
            const imageOwnerId = new UuidVO(ownerId);
            const imageTitle = new TitleVO(title);
            const imageSlug = new UrlSlugVO(slug);
            const imageFormat = new ImageFormatVO(format);
            const imageSize = new IntGtZeroVO(size);
            const imageHeight = new IntGtZeroVO(height);
            const imageWidth = new IntGtZeroVO(width);
            const imageCreatedAt = new PreviousDateVO(new Date());

            const image = new ImageModel(
                imageId,
                imageOwnerId,
                imageTitle,
                imageSlug,
                imageFormat,
                imageSize,
                imageHeight,
                imageWidth,
                imageCreatedAt
            );

            await this.imageRepository.create(image);
        } catch (err) {
            // Si hay un error de formato de VO, es porque algún campo
            // no tiene el formato adecuado, por lo que se considera inválido
            console.log(err);
            if (err instanceof VOFormatException)
                throw new InvalidImageException();

            // Si el error es otro, lo lanzamos hacia arriba para que se trate
            // en el lugar adecuado, igual que el resto de casos de uso
            throw err;
        }
    }
}
