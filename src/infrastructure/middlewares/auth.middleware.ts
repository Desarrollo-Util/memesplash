import type { NextFunction, Response } from 'express';
import { InfrastructureUnauthorizedException } from '../errors/unauthorized.exception';
import { verifyAsync } from '../services/jwt.service';
import { RequestWithAuth } from '../types/request.types';

export const authMiddleware = async (
    req: RequestWithAuth,
    _res: Response,
    next: NextFunction
) => {
    const jwt = req.get('Authorization')?.split('Bearer ')?.[1];
    if (!jwt) return next(new InfrastructureUnauthorizedException());

    try {
        const jwtPayload = await verifyAsync(jwt);
        req.userId = jwtPayload.id;

        return next();
    } catch (err) {
        return next(new InfrastructureUnauthorizedException());
    }
};

const isNumber = (value: unknown): value is number => typeof value === 'number';

const a: any = 5;

if (isNumber(a)) {
    a;
} else {
    a;
}
