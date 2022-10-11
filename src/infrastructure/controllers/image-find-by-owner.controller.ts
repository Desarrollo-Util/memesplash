import type { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { ImageFindByOwnerUseCase } from '../../application/use-cases/image-find-by-owner.usecase';
import { ContainerSymbols } from '../../symbols';
import { RequestWithAuth } from '../types/request.types';

export class ImageFindByOwnerController {
    constructor(
        @inject(ContainerSymbols.ImageFindByOwnerUseCase)
        private imageFindByOwnerUseCase: ImageFindByOwnerUseCase
    ) {}

    async execute(req: RequestWithAuth, res: Response, next: NextFunction) {
        const { userId } = req;

        try {
            const userImages = await this.imageFindByOwnerUseCase.execute(
                userId
            );

            return res.send(userImages);
        } catch (err) {
            next(err);
        }
    }
}
