import container from '../../../container';
import { ContainerSymbols } from '../../../symbols';
import { UserLoginController } from '../controllers/user-login.controller';
import { UserProfileController } from '../controllers/user-profile.controller';
import { UserRefreshController } from '../controllers/user-refresh.controller';
import { UserRegisterController } from '../controllers/user-register.controller';

import { authMiddleware } from '@shared/infrastructure/middlewares/auth.middleware';
import { registerRoute } from '@shared/infrastructure/utils/route';
import { getRef } from '@shared/infrastructure/utils/typebox-decorators';
import { FastifyInstance } from 'fastify';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserTokenDto } from '../dtos/user-token.dto';
import { UserDto } from '../dtos/user.dto';

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
    registerRoute(
        fastify,
        {
            method: 'GET',
            url: '/profile',
            preValidation: authMiddleware,
            schema: {
                response: {
                    200: getRef(UserDto),
                },
            },
        },
        userProfileController.execute.bind(userProfileController)
    );

    registerRoute(
        fastify,
        {
            method: 'POST',
            url: '/login',
            schema: {
                body: getRef(UserLoginDto),
                response: {
                    200: getRef(UserTokenDto),
                },
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
                body: getRef(UserRegisterDto),
                response: {
                    201: {
                        description: 'Empty response',
                        type: 'null',
                    },
                },
            },
        },
        userRegisterController.execute.bind(userRegisterController)
    );

    registerRoute(
        fastify,
        {
            method: 'GET',
            url: '/refresh',
            preValidation: authMiddleware,
            schema: {
                response: {
                    200: getRef(UserTokenDto),
                },
            },
        },
        userRefreshController.execute.bind(userRefreshController)
    );

    done();
};
