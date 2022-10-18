import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase';
import { ContainerSymbols } from '../../symbols';
import { UserRegisterDtoType } from '../dtos/user-register.dto';

@injectable()
export class UserRegisterController {
    constructor(
        @inject(ContainerSymbols.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: UserRegisterDtoType }>,
        res: FastifyReply
    ) {
        const { id, name, email, password } = req.body;

        await this.userRegisterUseCase.execute(id, name, email, password);

        res.status(201).send();
    }
}
