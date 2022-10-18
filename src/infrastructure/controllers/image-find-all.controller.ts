import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { ImageFindAllUseCase } from '../../application/use-cases/image-find-all.usecase';
import { ContainerSymbols } from '../../symbols';

export class ImageFindAllController {
    constructor(
        @inject(ContainerSymbols.ImageFindAllUseCase)
        private imageFindAllUseCase: ImageFindAllUseCase
    ) {}

    async execute(_req: FastifyRequest, res: FastifyReply) {
        const images = await this.imageFindAllUseCase.execute();

        return res.send(images);
    }
}
