import { Type, type Static } from '@sinclair/typebox';

// TODO: Validations
export const UserLoginDto = Type.Object(
    {
        email: Type.String(),
        password: Type.String(),
    },
    { additionalProperties: false }
);

export type UserLoginDtoType = Static<typeof UserLoginDto>;
