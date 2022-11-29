import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { NameVO } from '@shared/domain/value-objects/name.vo';
import { PasswordVO } from '@shared/domain/value-objects/password.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception';

@injectable()
export class UserRegisterUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(
        id: UuidVO,
        name: NameVO,
        email: EmailVO,
        password: PasswordVO
    ): Promise<void> {
        const newUser = UserModel.createUser(id, name, email, password);

        const existingUserById = await this.userRepository.findById(id);
        if (existingUserById) throw new UserIdAlreadyInUseException();

        const existingUserByEmail = await this.userRepository.findByEmail(
            email
        );
        if (existingUserByEmail) throw new UserEmailAlreadyInUseException();

        await this.userRepository.create(newUser);
    }
}
