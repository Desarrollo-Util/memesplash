/** Symbols for repositories */
const Repositories = {
    UserRepository: Symbol.for('UserRepository'),
    ImageRepository: Symbol.for('ImageRepository'),
};

const UseCases = {
    ImageFindAllUseCase: Symbol.for('ImageFindAllUseCase'),
    ImageFindByOwnerUseCase: Symbol.for('ImageFindByOwnerUseCase'),
    ImageUploadUseCase: Symbol.for('ImageUploadUseCase'),
    UserLoginUseCase: Symbol.for('UserLoginUseCase'),
    UserProfileUseCase: Symbol.for('UserProfileUseCase'),
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
};

const Controllers = {
    ImageFindAllController: Symbol.for('ImageFindAllController'),
    ImageFindByOwnerController: Symbol.for('ImageFindByOwnerController'),
    ImageUploadController: Symbol.for('ImageUploadController'),
    UserLoginController: Symbol.for('UserLoginController'),
    UserProfileController: Symbol.for('UserProfileController'),
    UserRefreshController: Symbol.for('UserRefreshController'),
    UserRegisterController: Symbol.for('UserRegisterController'),
};

const ContainerSymbols = {
    ...Repositories,
    ...UseCases,
    ...Controllers,
};

export { ContainerSymbols };
