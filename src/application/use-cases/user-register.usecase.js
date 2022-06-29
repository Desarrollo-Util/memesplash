import { UserModel } from '../../domain/models/user.model.js';
import { UserEmailAlreadyInUseException } from '../errors/user-email-already-in-use.exception.js';
import { UserIdAlreadyInUseException } from '../errors/user-id-already-in-use.exception.js';

export class UserRegisterUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(id, name, email, password) {
        const newUser = await UserModel.create(id, name, email, password);

        // Comprobar si existe id duplicado
        const existingUserById = await this.userRepository.findById(id);
        if (existingUserById) {
            throw new UserIdAlreadyInUseException();
        }

        // Comprobar si existe email duplicado
        const existingUserByEmail = await this.userRepository.findByEmail(
            email
        );
        if (existingUserByEmail) {
            throw new UserEmailAlreadyInUseException();
        }

        // Persistir el nuevo usuario
        await this.userRepository.create(newUser);
    }
}
