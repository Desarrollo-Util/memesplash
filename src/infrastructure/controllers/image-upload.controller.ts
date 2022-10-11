import type { NextFunction, Response } from 'express';
import { imageSize } from 'image-size';
import { inject } from 'inversify';
import { promisify } from 'util';
import { ImageUploadUseCase } from '../../application/use-cases/image-upload.usecase';
import { ImageFormats } from '../../domain/constants/image-formats.enum';
import { ContainerSymbols } from '../../symbols';
import { RequestWithFileProps } from '../types/request.types';

const sizeOf = promisify(imageSize);

export class ImageUploadController {
    constructor(
        @inject(ContainerSymbols.ImageUploadUseCase)
        private imageUploadUseCase: ImageUploadUseCase
    ) {}

    async execute(
        req: RequestWithFileProps,
        res: Response,
        next: NextFunction
    ) {
        const { file, title, slug, userId } = req;
        const { id } = req.body;
        if (!file) throw new Error();

        const dimensions = await sizeOf(file.path);

        if (!dimensions) throw new Error();

        try {
            await this.imageUploadUseCase.execute(
                id,
                userId,
                title,
                slug,
                file.mimetype as ImageFormats,
                file.size,
                dimensions.height || 0,
                dimensions.width || 0
            );

            return res.sendStatus(201);
        } catch (err) {
            next(err);
        }
    }
}
