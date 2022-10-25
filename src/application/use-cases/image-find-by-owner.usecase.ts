import { inject, injectable } from 'inversify';
import { ImageModel } from '../../domain/models/image.model';
import { IImageRepository } from '../../domain/repository/image-repository.interface';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';

@injectable()
export class ImageFindByOwnerUseCase {
    constructor(
        @inject(ContainerSymbols.ImageRepository)
        private imageRepository: IImageRepository
    ) {}

    execute(ownerId: UuidVO): Promise<ImageModel[]> {
        return this.imageRepository.findByOwnerId(ownerId);
    }
}
