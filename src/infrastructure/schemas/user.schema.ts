import mongoose, { type Model } from 'mongoose';
import type { IUserDoc } from '../types/schemas/user-doc.interface';

const schema = new mongoose.Schema({
    _id: { type: String, _id: false, required: true },
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false },
});

export const UserSchema: Model<IUserDoc> = mongoose.model('User', schema);
