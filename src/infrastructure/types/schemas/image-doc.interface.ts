import type { LeanDocument } from 'mongoose';
import type { ImageFormats } from '../../../domain/constants/image-formats.enum';

export interface IImage {
    _id: string;
    ownerId: string;
    title: string;
    slug: string;
    format: ImageFormats;
    size: number;
    height: number;
    width: number;
    createdAt: Date;
}

export interface IImageDoc extends LeanDocument<IImage> {}
