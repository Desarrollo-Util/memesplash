import type { ExecutionContext } from 'ava';
import type { LightMyRequestResponse } from 'fastify';

export const expectStatusCode = (
    t: ExecutionContext<unknown>,
    expectedCode: number,
    response: LightMyRequestResponse
) => {
    t.is(
        response.statusCode,
        expectedCode,
        `Expected status code ${expectedCode}, but received ${response.statusCode}`
    );
};
