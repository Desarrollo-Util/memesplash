import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: { type: String, _id: false },
    title: { type: String, index: true, required: true },
    slug: { type: String, required: true },
    size: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    createdAt: { type: Date, required: true },
});

export const ImageSchema = mongoose.model('Image', schema);
