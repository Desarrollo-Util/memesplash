export class ImageFindAllUseCase {
    constructor({ imageRepository }) {
        this.imageRepository = imageRepository;
    }

    async execute() {
        const images = await this.imageRepository.findAll();

        return images.map((image) => ({
            id: image.id.value,
            ownerId: image.ownerId.value,
            title: image.title.value,
            slug: image.slug.value,
            format: image.format.value,
            size: image.size.value,
            height: image.height.value,
            width: image.width.value,
            createdAt: image.createdAt.value,
        }));
    }
}
