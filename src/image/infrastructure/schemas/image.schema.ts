import mongoose, { Model } from 'mongoose';
import { ImageFormats } from '../../domain/constants/image-formats.enum';
import type { IImageDoc } from '../types/schemas/image-doc.interface';

const schema = new mongoose.Schema({
    _id: { type: String, _id: false, required: true },
    ownerId: { type: String, required: true },
    title: { type: String, index: true, required: true },
    slug: { type: String, required: true },
    format: { type: String, required: true, enum: Object.values(ImageFormats) },
    size: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    createdAt: { type: Date, required: true },
});

export const ImageSchema: Model<IImageDoc> = mongoose.model('Image', schema);
