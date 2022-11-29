import { ImageFindAllUseCase } from '@image/application/use-cases/image-find-all.usecase';
import { ImageFindByOwnerUseCase } from '@image/application/use-cases/image-find-by-owner.usecase';
import { ImageUploadUseCase } from '@image/application/use-cases/image-upload.usecase';
import { IImageRepository } from '@image/domain/repository/image-repository.interface';
import { ImageFindAllController } from '@image/infrastructure/controllers/image-find-all.controller';
import { ImageFindByOwnerController } from '@image/infrastructure/controllers/image-find-by-owner.controller';
import { ImageUploadController } from '@image/infrastructure/controllers/image-upload.controller';
import { ImageRepository } from '@image/infrastructure/repositories/image.repository';
import { UserLoginUseCase } from '@user/application/use-cases/user-login.usecase';
import { UserProfileUseCase } from '@user/application/use-cases/user-profile.usecase';
import { UserRegisterUseCase } from '@user/application/use-cases/user-register.usecase';
import { IUserRepository } from '@user/domain/repository/user-repository.interface';
import { UserLoginController } from '@user/infrastructure/controllers/user-login.controller';
import { UserProfileController } from '@user/infrastructure/controllers/user-profile.controller';
import { UserRefreshController } from '@user/infrastructure/controllers/user-refresh.controller';
import { UserRegisterController } from '@user/infrastructure/controllers/user-register.controller';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';
import { Container } from 'inversify';
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
