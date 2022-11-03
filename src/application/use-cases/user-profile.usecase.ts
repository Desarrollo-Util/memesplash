import { inject, injectable } from 'inversify';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';
import { ApplicationUnauthorizedException } from '../errors/application-unauthorized.exception';

@injectable()
export class UserProfileUseCase {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: IUserRepository
    ) {}

    async execute(userId: UuidVO): Promise<UserModel> {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) throw new ApplicationUnauthorizedException();

        return existingUser;
    }
}
