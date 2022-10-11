import type { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { UserProfileUseCase } from '../../application/use-cases/user-profile.usecase';
import { ContainerSymbols } from '../../symbols';
import { RequestWithAuth } from '../types/request.types';
export class UserProfileController {
    constructor(
        @inject(ContainerSymbols.UserProfileUseCase)
        private userProfileUseCase: UserProfileUseCase
    ) {}

    async execute(req: RequestWithAuth, res: Response, next: NextFunction) {
        const { userId } = req;

        try {
            const user = await this.userProfileUseCase.execute(userId);

            return res.send(user);
        } catch (err) {
            next(err);
        }
    }
}
