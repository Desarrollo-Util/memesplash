import { Type, type Static } from '@sinclair/typebox';

export const UserLoginDto = Type.Object(
    {
        email: Type.String(),
        password: Type.String(),
    },
    { additionalProperties: false }
);

export type UserLoginDtoType = Static<typeof UserLoginDto>;
