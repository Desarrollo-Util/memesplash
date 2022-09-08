import awilix from 'awilix';
import { ImageUploadUseCase } from './application/use-cases/image-upload.usecase.js';
import { UserLoginUseCase } from './application/use-cases/user-login.usecase.js';
import { UserProfileUseCase } from './application/use-cases/user-profile.usecase.js';
import { UserRegisterUseCase } from './application/use-cases/user-register.usecase.js';
import { ImageUploadController } from './infrastructure/controllers/image-upload.controller.js';
import { UserLoginController } from './infrastructure/controllers/user-login.controller.js';
import { UserProfileController } from './infrastructure/controllers/user-profile.controller.js';
import { UserRegisterController } from './infrastructure/controllers/user-register.controller.js';
import { ImageRepository } from './infrastructure/repositories/image.repository.js';
import { UserRepository } from './infrastructure/repositories/user.repository.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

// Use cases
container.register({
    // User
    userLoginUseCase: awilix.asClass(UserLoginUseCase).singleton(),
    userRegisterUseCase: awilix.asClass(UserRegisterUseCase).singleton(),
    userProfileUseCase: awilix.asClass(UserProfileUseCase).singleton(),
    // Image
    imageUploadUseCase: awilix.asClass(ImageUploadUseCase).singleton(),
});

// Controllers
container.register({
    // User
    userLoginController: awilix.asClass(UserLoginController).singleton(),
    userRegisterController: awilix.asClass(UserRegisterController).singleton(),
    userProfileController: awilix.asClass(UserProfileController).singleton(),
    // Image
    imageUploadController: awilix.asClass(ImageUploadController).singleton(),
});

// Repositories
container.register({
    // User
    userRepository: awilix.asClass(UserRepository).singleton(),
    // Image
    imageRepository: awilix.asClass(ImageRepository).singleton(),
});

export default container;
