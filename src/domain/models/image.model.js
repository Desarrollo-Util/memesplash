/**
 * Image uploaded in the application
 */
export class ImageModel {
    /**
     * Constructor
     * @param {String} id Image unique identifier
     * @param {String} title Image title
     * @param {String} src Image filename
     * @param {ImageFormat} format Image format
     * @param {Number} size Image size in bytes
     * @param {Number} height Image height in pixels
     * @param {Number} width Image width in pixels
     * @param {Date} createdAt Image creation date
     */
    constructor(id, title, src, format, size, height, width, createdAt) {
        this.id = id;
        this.title = title;
        this.src = src;
        this.format = format;
        this.size = size;
        this.height = height;
        this.width = width;
        this.createdAt = createdAt;
    }
}
