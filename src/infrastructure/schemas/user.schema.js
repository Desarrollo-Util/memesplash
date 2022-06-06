import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: { type: String, _id: false },
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false },
    images: { type: [String], required: false },
});

export const UserSchema = mongoose.model('User', schema);
