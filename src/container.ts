import { Container } from 'inversify';
import { ImageFindAllUseCase } from './application/use-cases/image-find-all.usecase';
import { ImageFindByOwnerUseCase } from './application/use-cases/image-find-by-owner.usecase';
import { ImageUploadUseCase } from './application/use-cases/image-upload.usecase';
import { UserLoginUseCase } from './application/use-cases/user-login.usecase';
import { UserProfileUseCase } from './application/use-cases/user-profile.usecase';
import { UserRegisterUseCase } from './application/use-cases/user-register.usecase';
import { IImageRepository } from './domain/repository/image-repository.interface';
import { IUserRepository } from './domain/repository/user-repository.interface';
import { ImageFindAllController } from './infrastructure/controllers/image-find-all.controller';
import { ImageFindByOwnerController } from './infrastructure/controllers/image-find-by-owner.controller';
import { ImageUploadController } from './infrastructure/controllers/image-upload.controller';
import { UserLoginController } from './infrastructure/controllers/user-login.controller';
import { UserProfileController } from './infrastructure/controllers/user-profile.controller';
import { UserRefreshController } from './infrastructure/controllers/user-refresh.controller';
import { UserRegisterController } from './infrastructure/controllers/user-register.controller';
import { ImageRepository } from './infrastructure/repositories/image.repository';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { ContainerSymbols } from './symbols';

const container = new Container();

//#region Repositories

container
    .bind<IUserRepository>(ContainerSymbols.UserRepository)
    .to(UserRepository);
container
    .bind<IImageRepository>(ContainerSymbols.ImageRepository)
    .to(ImageRepository);

//#endregion

//#region Use cases

container
    .bind<ImageFindAllUseCase>(ContainerSymbols.ImageFindAllUseCase)
    .to(ImageFindAllUseCase);
container
    .bind<ImageFindByOwnerUseCase>(ContainerSymbols.ImageFindByOwnerUseCase)
    .to(ImageFindByOwnerUseCase);
container
    .bind<ImageUploadUseCase>(ContainerSymbols.ImageUploadUseCase)
    .to(ImageUploadUseCase);
container
    .bind<UserLoginUseCase>(ContainerSymbols.UserLoginUseCase)
    .to(UserLoginUseCase);
container
    .bind<UserProfileUseCase>(ContainerSymbols.UserProfileUseCase)
    .to(UserProfileUseCase);
container
    .bind<UserRegisterUseCase>(ContainerSymbols.UserRegisterUseCase)
    .to(UserRegisterUseCase);

//#endregion

//#region Controllers

container
    .bind<ImageFindAllController>(ContainerSymbols.ImageFindAllController)
    .to(ImageFindAllController);
container
    .bind<ImageFindByOwnerController>(
        ContainerSymbols.ImageFindByOwnerController
    )
    .to(ImageFindByOwnerController);
container
    .bind<ImageUploadController>(ContainerSymbols.ImageUploadController)
    .to(ImageUploadController);
container
    .bind<UserLoginController>(ContainerSymbols.UserLoginController)
    .to(UserLoginController);
container
    .bind<UserProfileController>(ContainerSymbols.UserProfileController)
    .to(UserProfileController);
container
    .bind<UserRefreshController>(ContainerSymbols.UserRefreshController)
    .to(UserRefreshController);
container
    .bind<UserRegisterController>(ContainerSymbols.UserRegisterController)
    .to(UserRegisterController);

//#endregion

export default container;
