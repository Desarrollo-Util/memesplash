import { compare } from 'bcrypt';
import { UserRepository } from '../../infrastructure/repositories/user.repository.js';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export const userLoginUseCase = async (email, password) => {
    // Comprobar si existe el usuario por email
    const existingUser = await UserRepository.findByEmail(email);
    if (!existingUser) {
        throw new InvalidLoginException();
    }

    // Comprobar si la password coincide
    const didPasswordMatch = await compare(password, existingUser.password);
    if (!didPasswordMatch) {
        throw new InvalidLoginException();
    }

    // Devolver el ID del usuario existente
    return existingUser.id;
};
