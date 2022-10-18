import {
    FastifyReply,
    FastifyRequest,
    preHandlerAsyncHookHandler,
} from 'fastify';
import { InfrastructureUnauthorizedException } from '../errors/unauthorized.exception';
import { verifyAsync } from '../services/jwt.service';

export const authMiddleware: preHandlerAsyncHookHandler = async (
    req: FastifyRequest,
    _res: FastifyReply
): Promise<void> => {
    const jwt = req.headers.authorization?.split('Bearer ')?.[1];
    if (!jwt) throw new InfrastructureUnauthorizedException();

    try {
        const jwtPayload = await verifyAsync(jwt);

        req.userId = jwtPayload.id;
    } catch (err) {
        throw new InfrastructureUnauthorizedException();
    }
};
