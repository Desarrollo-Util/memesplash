import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware.js';
import { imageRoutes } from './infrastructure/routes/images.routes.js';
import { userRoutes } from './infrastructure/routes/user.routes.js';

dotenvConfig();

export const bootstrap = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(userRoutes);
    app.use(imageRoutes);

    app.use(errorMiddleware);

    // TODO: Tratar error de timeout
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            connectTimeoutMS: 10000,
        });
    } catch (err) {
        console.err('Se ha producido un error al conectar con la BBDD', err);
    }

    console.log('Conexión con la BBDD realizada');

    app.listen(process.env.PORT, () =>
        console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
    );
};
