import type { NextFunction, Response } from 'express';
import { signAsync } from '../services/jwt.service.js';
import { RequestWithAuth } from '../types/request.types.js';

export class UserRefreshController {
    async execute(req: RequestWithAuth, res: Response, next: NextFunction) {
        const { userId } = req;

        try {
            const payload = { id: userId };
            const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

            const token = await signAsync(payload, signOptions);

            return res.send({ token });
        } catch (err) {
            next(err);
        }
    }
}
