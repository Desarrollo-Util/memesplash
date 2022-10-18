import { inject } from 'inversify';
import { VOFormatException } from '../../domain/errors/vo-format.exception';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';
import { ApplicationUnauthorizedException } from '../errors/application-unauthorized.exception';

export class UserProfileUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(id: string) {
        try {
            const userId = new UuidVO(id);

            const existingUser = await this.userRepository.findById(userId);

            if (!existingUser) {
                throw new ApplicationUnauthorizedException();
            }

            return {
                id: existingUser.id.value,
                name: existingUser.name.value,
                email: existingUser.email.value,
                profilePic: existingUser.profilePic?.value,
            };
        } catch (err) {
            if (err instanceof VOFormatException)
                throw new ApplicationUnauthorizedException();

            throw err;
        }
    }
}
