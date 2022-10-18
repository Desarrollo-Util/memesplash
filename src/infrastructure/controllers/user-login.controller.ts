import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import { UserLoginUseCase } from '../../application/use-cases/user-login.usecase';
import { ContainerSymbols } from '../../symbols';
import { UserLoginDtoType } from '../dtos/user-login.dto';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception';
import { signAsync } from '../services/jwt.service';

export class UserLoginController {
    constructor(
        @inject(ContainerSymbols.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: UserLoginDtoType }>,
        res: FastifyReply
    ) {
        const { email, password, ...rest } = req.body;

        if (!email || !password) throw new MissingFieldsFormatException();

        if (Object.keys(rest).length !== 0)
            throw new UnnecesaryFieldsFormatException();

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
