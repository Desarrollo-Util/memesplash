import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { ImageModel } from '../../domain/models/image.model';
import { IImageRepository } from '../../domain/repository/image-repository.interface';

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
