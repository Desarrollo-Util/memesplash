import { Type, type Static } from '@sinclair/typebox';

// TODO: Validations
export const ImageDto = Type.Object(
    {
        id: Type.String(),
        ownerId: Type.String(),
        title: Type.String(),
        slug: Type.String(),
        format: Type.String(),
        size: Type.Integer(),
        height: Type.Integer(),
        width: Type.Integer(),
        createdAt: Type.Integer(),
    },
    { additionalProperties: false }
);

export const ImageArrayDto = Type.Array(ImageDto);

export type ImageDtoType = Static<typeof ImageDto>;
