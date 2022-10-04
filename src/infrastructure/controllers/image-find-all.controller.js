export class ImageFindAllController {
    constructor({ imageFindAllUseCase }) {
        this.imageFindAllUseCase = imageFindAllUseCase;
    }

    async execute(req, res, next) {
        try {
            const images = await this.imageFindAllUseCase.execute();

            return res.send(images);
        } catch (err) {
            next(err);
        }
    }
}
