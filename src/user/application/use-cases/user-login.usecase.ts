import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { PlainPasswordVO } from '@shared/domain/value-objects/plain-password.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { InvalidLoginException } from '../errors/invalid-login.exception';

@injectable()
export class UserLoginUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(email: EmailVO, password: PlainPasswordVO): Promise<UuidVO> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) throw new InvalidLoginException();

        const didPasswordMatch = await existingUser.comparePassword(password);
        if (!didPasswordMatch) throw new InvalidLoginException();

        return existingUser.id;
    }
}
