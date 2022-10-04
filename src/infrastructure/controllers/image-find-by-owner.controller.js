export class ImageFindByOwnerController {
    constructor({ imageFindByOwnerUseCase }) {
        this.imageFindByOwnerUseCase = imageFindByOwnerUseCase;
    }

    async execute(req, res, next) {
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
