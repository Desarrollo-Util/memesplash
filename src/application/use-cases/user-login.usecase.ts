import { inject } from 'inversify';
import { VOFormatException } from '../../domain/errors/vo-format.exception.js';
import { IUserRepository } from '../../domain/repository/user-repository.interface.js';
import { EmailVO } from '../../domain/value-objects/email.vo.js';
import { PlainPasswordVO } from '../../domain/value-objects/plain-password.vo.js';
import { ContainerSymbols } from '../../symbols.js';
import { InvalidLoginException } from '../errors/invalid-login.exception.js';

export class UserLoginUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string) {
        try {
            const userEmail = new EmailVO(email);
            const userPassword = new PlainPasswordVO(password);

            // Comprobar si existe el usuario por email
            const existingUser = await this.userRepository.findByEmail(
                userEmail
            );
            if (!existingUser) {
                throw new InvalidLoginException();
            }

            // Comprobar si la password coincide
            const didPasswordMatch = await existingUser.password.compare(
                userPassword
            );

            if (!didPasswordMatch) {
                throw new InvalidLoginException();
            }

            // Devolver el ID del usuario existente
            return existingUser.id.value;
        } catch (err) {
            // Si hay un error de formato de VO, es porque el email/contraseña
            // no tienen el formato adecuado, por lo que se considera login inválido
            if (err instanceof VOFormatException)
                throw new InvalidLoginException();

            // Si el error es otro, lo lanzamos hacia arriba para que se trate
            // en el lugar adecuado, igual que el resto de casos de uso
            throw err;
        }
    }
}
