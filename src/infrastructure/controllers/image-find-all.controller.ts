import type { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { ImageFindAllUseCase } from '../../application/use-cases/image-find-all.usecase';
import { ContainerSymbols } from '../../symbols';

export class ImageFindAllController {
    constructor(
        @inject(ContainerSymbols.ImageFindAllUseCase)
        private imageFindAllUseCase: ImageFindAllUseCase
    ) {}

    async execute(_req: Request, res: Response, next: NextFunction) {
        try {
            const images = await this.imageFindAllUseCase.execute();

            return res.send(images);
        } catch (err) {
            next(err);
        }
    }
}
