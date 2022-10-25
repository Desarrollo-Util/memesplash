import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { NameVO } from '../../domain/value-objects/name.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
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
    ): Promise<void> {
        const { id, name, email, password } = req.body;

        await this.userRegisterUseCase.execute(
            new UuidVO(id),
            new NameVO(name),
            new EmailVO(email),
            await PasswordVO.create(password)
        );

        res.statusCode = 201;
    }
}
