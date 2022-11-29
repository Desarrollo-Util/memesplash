import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { NameVO } from '@shared/domain/value-objects/name.vo';
import { PasswordVO } from '@shared/domain/value-objects/password.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase';
import { UserRegisterDto } from '../dtos/user-register.dto';

@injectable()
export class UserRegisterController {
    constructor(
        @inject(ContainerSymbols.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: UserRegisterDto }>,
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
