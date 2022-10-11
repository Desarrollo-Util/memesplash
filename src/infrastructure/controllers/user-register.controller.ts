import type { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase.js';
import { ContainerSymbols } from '../../symbols.js';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';

export class UserRegisterController {
    constructor(
        @inject(ContainerSymbols.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {}

    async execute(req: Request, res: Response, next: NextFunction) {
        const { id, name, email, password, ...rest } = req.body;

        try {
            if (!id || !name || !email || !password)
                throw new MissingFieldsFormatException();

            if (Object.keys(rest).length !== 0)
                throw new UnnecesaryFieldsFormatException();

            await this.userRegisterUseCase.execute(id, name, email, password);

            res.status(201).send();
        } catch (err) {
            next(err);
        }
    }
}
