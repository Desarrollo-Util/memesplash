import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { UserProfileUseCase } from '../../application/use-cases/user-profile.usecase';
import { UserDto } from '../dtos/user.dto';

@injectable()
export class UserProfileController {
    constructor(
        @inject(ContainerSymbols.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {}

    async execute(_req: FastifyRequest, res: FastifyReply): Promise<UserDto> {
        const user = await this.userProfileUseCase.execute(
            new UuidVO(res.userId)
        );

        return {
            id: user.id.value,
            name: user.name.value,
            email: user.email.value,
            profilePic: user.profilePic?.value,
        };
    }
}
