import { ApplicationUnauthorizedException } from '@shared/application/errors/application-unauthorized.exception';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';

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
