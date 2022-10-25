import mongoose from 'mongoose';

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string, {
        connectTimeoutMS: 10000,
    });
};

export default connectDb;
