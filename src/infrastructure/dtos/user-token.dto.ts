import { Static, Type } from '@sinclair/typebox';

// TODO: Validations
export const UserTokenDto = Type.Object(
    {
        token: Type.String(),
    },
    {
        additionalProperties: false,
    }
);

export type UserTokenDtoType = Static<typeof UserTokenDto>;
