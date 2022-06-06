import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware.js';
import { userRoutes } from './infrastructure/routes/user.routes.js';

dotenvConfig();

const bootstrap = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(userRoutes);

    app.use(errorMiddleware);

    await mongoose.connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}?authSource=admin
        `
    );

    app.listen(process.env.PORT, () =>
        console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
    );
};

bootstrap();
