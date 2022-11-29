import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { ImageModel } from '../../domain/models/image.model';
import { IImageRepository } from '../../domain/repository/image-repository.interface';

@injectable()
export class ImageFindAllUseCase {
    constructor(
        @inject(ContainerSymbols.ImageRepository)
        private imageRepository: IImageRepository
    ) {}

    execute(): Promise<ImageModel[]> {
        return this.imageRepository.findAll();
    }
}
