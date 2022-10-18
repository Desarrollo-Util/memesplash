import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import { UserLoginUseCase } from '../../application/use-cases/user-login.usecase';
import { ContainerSymbols } from '../../symbols';
import { UserLoginDtoType } from '../dtos/user-login.dto';
import { signAsync } from '../services/jwt.service';

@injectable()
export class UserLoginController {
    constructor(
        @inject(ContainerSymbols.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: UserLoginDtoType }>,
        res: FastifyReply
    ) {
        const { email, password } = req.body;

        const id = await this.userLoginUseCase.execute(email, password);

        const payload = { id };
        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return res.send({ token });
    }
}
