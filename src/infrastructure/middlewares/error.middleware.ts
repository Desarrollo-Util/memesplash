import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ApplicationConflictException } from '../../application/errors/application-conflict.exception';
import { ApplicationUnauthorizedException } from '../../application/errors/application-unauthorized.exception';
import { DomainFormatException } from '../../domain/errors/domain-format.exception';
import { InfrastructureFormatException } from '../errors/infrastructure-format.exception';

export const errorMiddleware: (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => void = (error, req, res) => {
    // console.error('\x1b[0;31m' + error.stack);

    if (
        error instanceof DomainFormatException ||
        error instanceof InfrastructureFormatException
    )
        return res.status(400).send({ errorMessage: error.message });

    if (
        error instanceof ApplicationUnauthorizedException ||
        error instanceof InfrastructureFormatException
    )
        return res.status(401).send({ errorMessage: error.message });

    if (error instanceof ApplicationConflictException)
        return res.status(409).send({ errorMessage: error.message });

    console.log(error);
    return res.status(500).send({ errorMessage: 'Error interno del servidor' });
};
