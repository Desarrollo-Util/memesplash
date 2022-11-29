import type { LeanDocument } from 'mongoose';

export interface IUser {
    _id: string;
    email: string;
    name: string;
    password: string;
    profilePic?: string;
}

export interface IUserDoc extends LeanDocument<IUser> {}
