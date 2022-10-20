import container from '../../container';
import { ContainerSymbols } from '../../symbols';
import { UserLoginController } from '../controllers/user-login.controller';
import { UserProfileController } from '../controllers/user-profile.controller';
import { UserRefreshController } from '../controllers/user-refresh.controller';
import { UserRegisterController } from '../controllers/user-register.controller';

import { FastifyInstance } from 'fastify';
import { UserLoginDto } from '../dtos/user-login.dto';
import {
    UserRegisterDto,
    UserRegisterDtoType,
} from '../dtos/user-register.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
import { registerRoute } from '../utils/route';

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

export const UserRoutes = (
    fastify: FastifyInstance,
    _options: any,
    done: (err?: Error) => void
) => {
    fastify.route({
        method: 'GET',
        url: '/profile',
        handler: userProfileController.execute.bind(userProfileController),
    });

    registerRoute(
        fastify,
        {
            method: 'POST',
            url: '/login',
            schema: {
                body: UserLoginDto,
            },
        },
        userLoginController.execute.bind(userLoginController)
    );

    registerRoute(
        fastify,
        {
            method: 'POST',
            url: '/register',
            schema: {
                body: UserRegisterDto,
            },
        },
        userRegisterController.execute.bind(userRegisterController)
    );

    fastify.route({
        method: 'GET',
        url: '/refresh',
        handler: userRefreshController.execute.bind(userRefreshController),
    });

    done();
};
