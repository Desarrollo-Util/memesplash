import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase';
import { ContainerSymbols } from '../../symbols';
import { UserRegisterDtoType } from '../dtos/user-register.dto';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception';

export class UserRegisterController {
    constructor(
        @inject(ContainerSymbols.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: UserRegisterDtoType }>,
        res: FastifyReply
    ) {
        const { id, name, email, password, ...rest } = req.body;

        if (!id || !name || !email || !password)
            throw new MissingFieldsFormatException();

        if (Object.keys(rest).length !== 0)
            throw new UnnecesaryFieldsFormatException();

        await this.userRegisterUseCase.execute(id, name, email, password);

        res.status(201).send();
    }
}
