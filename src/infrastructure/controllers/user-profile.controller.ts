import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { UserProfileUseCase } from '../../application/use-cases/user-profile.usecase';
import { ContainerSymbols } from '../../symbols';
export class UserProfileController {
    constructor(
        @inject(ContainerSymbols.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {}

    async execute(req: FastifyRequest, res: FastifyReply) {
        const { userId } = req;

        const user = await this.userProfileUseCase.execute(userId);

        return res.send(user);
    }
}
