import awilix from 'awilix';
import { UserLoginUseCase } from './application/use-cases/user-login.usecase.js';
import { UserRegisterUseCase } from './application/use-cases/user-register.usecase.js';
import { UserLoginController } from './infrastructure/controllers/user-login.controller.js';
import { UserRegisterController } from './infrastructure/controllers/user-register.controller.js';
import { UserRepository } from './infrastructure/repositories/user.repository.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

// Use cases
container.register({
    userLoginUseCase: awilix.asClass(UserLoginUseCase).singleton(),
    userRegisterUseCase: awilix.asClass(UserRegisterUseCase).singleton(),
});

// Controllers
container.register({
    userLoginController: awilix.asClass(UserLoginController).singleton(),
    userRegisterController: awilix.asClass(UserRegisterController).singleton(),
});

// Repositories
container.register({
    userRepository: awilix.asClass(UserRepository).singleton(),
});

export default container;
