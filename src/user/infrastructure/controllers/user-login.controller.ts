import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { PlainPasswordVO } from '@shared/domain/value-objects/plain-password.vo';
import { signAsync } from '@shared/infrastructure/services/jwt.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import { ContainerSymbols } from '../../../symbols';
import { UserLoginUseCase } from '../../application/use-cases/user-login.usecase';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserTokenDto } from '../dtos/user-token.dto';

@injectable()
export class UserLoginController {
    constructor(
        @inject(ContainerSymbols.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    async execute(
        { body }: FastifyRequest<{ Body: UserLoginDto }>,
        _res: FastifyReply
    ): Promise<UserTokenDto> {
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
