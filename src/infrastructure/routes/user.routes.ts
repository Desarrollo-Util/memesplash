import container from '../../container';
import { ContainerSymbols } from '../../symbols';
import { UserLoginController } from '../controllers/user-login.controller';
import { UserProfileController } from '../controllers/user-profile.controller';
import { UserRefreshController } from '../controllers/user-refresh.controller';
import { UserRegisterController } from '../controllers/user-register.controller';

import { FastifyInstance } from 'fastify';
import { UserLoginDto, UserLoginDtoType } from '../dtos/user-login.dto';
import {
    UserRegisterDto,
    UserRegisterDtoType,
} from '../dtos/user-register.dto';
import { authMiddleware } from '../middlewares/auth.middleware';

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
    fastify.route({
        method: 'GET',
        url: 'profile',
        handler: userProfileController.execute.bind(userProfileController),
    });

    fastify.route<{ Body: UserLoginDtoType }>({
        method: 'POST',
        url: 'login',
        schema: {
            body: UserLoginDto,
        },
        preHandler: authMiddleware,
        handler: userLoginController.execute.bind(userLoginController),
    });

    fastify.route<{ Body: UserRegisterDtoType }>({
        method: 'POST',
        url: 'register',
        schema: {
            body: UserRegisterDto,
        },
        handler: userRegisterController.execute.bind(userRegisterController),
    });

    fastify.route({
        method: 'GET',
        url: 'refresh',
        handler: userRefreshController.execute.bind(userRefreshController),
    });
};
