import { InfrastructureUnauthorizedException } from '../errors/unauthorized.exception.js';
import { verifyAsync } from '../services/jwt.service.js';

export const authMiddleware = async (req, _, next) => {
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
