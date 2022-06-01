import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserEmailAlreadyInUseException } from '../errors/invalid-email-format.exception';
import { UserIdAlreadyInUseException } from '../errors/invalid-id-format.exception';

export const userRegisterUseCase = async (id, name, email, password) => {
    const newUser = await UserModel.create(id, name, email, password);

    // Comprobar si existe id duplicado
    const existingUserById = await UserRepository.findById(id);
    if (existingUserById) {
        throw new UserIdAlreadyInUseException();
    }

    // Comprobar si existe email duplicado
    const existingUserByEmail = await UserRepository.findByEmail(email);
    if (existingUserByEmail) {
        throw new UserEmailAlreadyInUseException();
    }

    // Persistir el nuevo usuario
    await UserRepository.create(newUser);
};
