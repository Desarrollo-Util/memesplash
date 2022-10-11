import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { UserLoginUseCase } from '../../application/use-cases/user-login.usecase.js';
import { ContainerSymbols } from '../../symbols.js';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';
import { signAsync } from '../services/jwt.service.js';

export class UserLoginController {
    constructor(
        @inject(ContainerSymbols.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    async execute(req: FastifyRequest, res: FastifyReply) {
        const { email, password, ...rest } = req.body;

        if (!email || !password) throw new MissingFieldsFormatException();

        if (Object.keys(rest).length !== 0)
            throw new UnnecesaryFieldsFormatException();

        const id = await this.userLoginUseCase.execute(email, password);

        const payload = { id };
        const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

        const token = await signAsync(payload, signOptions);

        return res.send({ token });
    }
}
