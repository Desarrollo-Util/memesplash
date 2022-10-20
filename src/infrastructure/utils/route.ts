import { Static, TObject } from '@sinclair/typebox';
import {
    ContextConfigDefault,
    FastifyBaseLogger,
    FastifyInstance,
    FastifySchema,
    FastifyTypeProviderDefault,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RouteHandlerMethod,
    RouteOptions,
} from 'fastify';

type KeysToCapitalize<T> = {
    [K in keyof T as Capitalize<string & K>]: T[K] extends TObject
        ? Static<T[K]>
        : never;
};

export const registerRoute = <S extends FastifySchema>(
    app: FastifyInstance,
    options: Omit<
        RouteOptions<
            RawServerDefault,
            RawRequestDefaultExpression<RawServerDefault>,
            RawReplyDefaultExpression<RawServerDefault>,
            any,
            ContextConfigDefault,
            any,
            FastifyTypeProviderDefault,
            FastifyBaseLogger
        >,
        'handler' | 'schema'
    > & {
        schema: S;
    },
    handler: RouteHandlerMethod<
        RawServerDefault,
        RawRequestDefaultExpression<RawServerDefault>,
        RawReplyDefaultExpression<RawServerDefault>,
        KeysToCapitalize<S>,
        ContextConfigDefault,
        FastifySchema,
        FastifyTypeProviderDefault,
        FastifyBaseLogger
    >
) => {
    app.route({
        ...options,
        handler,
    });
};
