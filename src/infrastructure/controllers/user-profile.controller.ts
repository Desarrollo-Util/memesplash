import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { UserProfileUseCase } from '../../application/use-cases/user-profile.usecase';
import { ContainerSymbols } from '../../symbols';

@injectable()
export class UserProfileController {
    constructor(
        @inject(ContainerSymbols.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {}

    async execute(_req: FastifyRequest, res: FastifyReply) {
        const { userId } = res;

        const user = await this.userProfileUseCase.execute(userId);

        return res.send(user);
    }
}
