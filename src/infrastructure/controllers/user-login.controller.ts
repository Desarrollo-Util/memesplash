import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import { UserLoginUseCase } from '../../application/use-cases/user-login.usecase';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { PlainPasswordVO } from '../../domain/value-objects/plain-password.vo';
import { ContainerSymbols } from '../../symbols';
import { UserLoginDtoType } from '../dtos/user-login.dto';
import { UserTokenDtoType } from '../dtos/user-token.dto';
import { signAsync } from '../services/jwt.service';

@injectable()
export class UserLoginController {
    constructor(
        @inject(ContainerSymbols.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    async execute(
        { body }: FastifyRequest<{ Body: UserLoginDtoType }>,
        _res: FastifyReply
    ): Promise<UserTokenDtoType> {
        const id = await this.userLoginUseCase.execute(
            new EmailVO(body.email),
            new PlainPasswordVO(body.password)
        );

        const payload = { id: id.value };

        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return { token };
    }
}
