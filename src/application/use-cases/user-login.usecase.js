import { compare } from 'bcrypt';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export class UserLoginUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(email, password) {
        // Comprobar si existe el usuario por email
        const existingUser = await this.userRepository.findByEmail(email);
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
    }
}
