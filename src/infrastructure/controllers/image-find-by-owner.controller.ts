import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ImageFindByOwnerUseCase } from '../../application/use-cases/image-find-by-owner.usecase';
import { ContainerSymbols } from '../../symbols';

@injectable()
export class ImageFindByOwnerController {
    constructor(
        @inject(ContainerSymbols.ImageFindByOwnerUseCase)
        private imageFindByOwnerUseCase: ImageFindByOwnerUseCase
    ) {}

    async execute(_req: FastifyRequest, res: FastifyReply) {
        const { userId } = res;

        const userImages = await this.imageFindByOwnerUseCase.execute(userId);

        return res.send(userImages);
    }
}
