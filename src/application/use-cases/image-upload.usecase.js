export class ImageUploadUseCase {
    constructor({ imageRepository }) {
        this.imageRepository = imageRepository;
    }

    async execute(id, title, slug, format, size, height, width, createdAt) {}
}
