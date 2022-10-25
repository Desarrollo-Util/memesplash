import { Type, type Static } from '@sinclair/typebox';

// TODO: Validations
export const UserDto = Type.Object(
    {
        id: Type.String(),
        name: Type.String(),
        email: Type.String(),
        profilePic: Type.Optional(Type.String()),
    },
    { additionalProperties: false }
);

export type UserDtoType = Static<typeof UserDto>;
