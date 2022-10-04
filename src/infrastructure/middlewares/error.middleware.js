import { ApplicationConflictException } from '../../application/errors/application-conflict.exception.js';
import { ApplicationUnauthorizedException } from '../../application/errors/application-unauthorized.exception.js';
import { DomainFormatException } from '../../domain/errors/domain-format.exception.js';
import { InfrastructureFormatException } from '../errors/infrastructure-format.exception.js';

export const errorMiddleware = (error, _, res, __) => {
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
