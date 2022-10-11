import { inject } from 'inversify';
import { UserModel } from '../../domain/models/user.model.js';
import { IUserRepository } from '../../domain/repository/user-repository.interface.js';
import { EmailVO } from '../../domain/value-objects/email.vo.js';
import { NameVO } from '../../domain/value-objects/name.vo.js';
import { PasswordVO } from '../../domain/value-objects/password.vo.js';
import { UuidVO } from '../../domain/value-objects/uuid.vo.js';
import { ContainerSymbols } from '../../symbols.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export class UserRegisterUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(id: string, name: string, email: string, password: string) {
        const userId = new UuidVO(id);
        const userEmail = new EmailVO(email);

        const newUser = UserModel.createUser(
            userId,
            new NameVO(name),
            userEmail,
            await PasswordVO.create(password)
        );

        // Comprobar si existe id duplicado
        const existingUserById = await this.userRepository.findById(userId);
        if (existingUserById) {
            throw new UserIdAlreadyInUseException();
        }

        // Comprobar si existe email duplicado
        const existingUserByEmail = await this.userRepository.findByEmail(
            userEmail
        );
        if (existingUserByEmail) {
            throw new UserEmailAlreadyInUseException();
        }

        // Persistir el nuevo usuario
        await this.userRepository.create(newUser);
    }
}
