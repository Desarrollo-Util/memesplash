import { Static, Type } from '@sinclair/typebox';

export const UserRegisterDto = Type.Object(
    {
        id: Type.String(),
        name: Type.String(),
        email: Type.String(),
        password: Type.String(),
    },
    {
        additionalProperties: false,
    }
);

export type UserRegisterDtoType = Static<typeof UserRegisterDto>;