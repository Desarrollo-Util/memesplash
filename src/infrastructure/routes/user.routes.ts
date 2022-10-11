import container from '../../container.js';
import { ContainerSymbols } from '../../symbols.js';
import { UserLoginController } from '../controllers/user-login.controller.js';
import { UserProfileController } from '../controllers/user-profile.controller.js';
import { UserRefreshController } from '../controllers/user-refresh.controller.js';
import { UserRegisterController } from '../controllers/user-register.controller.js';

import { FastifyInstance } from 'fastify';

const userLoginController = container.get<UserLoginController>(
    ContainerSymbols.UserLoginController
);
const userRegisterController = container.get<UserRegisterController>(
    ContainerSymbols.UserRegisterController
);
const userProfileController = container.get<UserProfileController>(
    ContainerSymbols.UserProfileController
);
const userRefreshController = container.get<UserRefreshController>(
    ContainerSymbols.UserRefreshController
);

export const UserRoutes = (fastify: FastifyInstance, options: any) => {
    // Auth
    fastify.get(
        '/profile',
        userProfileController.execute.bind(userProfileController)
    );

    fastify.post(
        '/login',
        {
            preHandler: authMiddleware,
        },
        userLoginController.execute.bind(userLoginController)
    );

    fastify.post(
        '/register',
        userRegisterController.execute.bind(userRegisterController)
    );

    // Auth
    fastify.post(
        '/refresh',
        userRefreshController.execute.bind(userRefreshController)
    );
};
