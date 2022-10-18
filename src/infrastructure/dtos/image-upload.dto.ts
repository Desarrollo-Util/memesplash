import { Type, type Static } from '@sinclair/typebox';

export const ImageUploadDto = Type.Object(
    {
        id: Type.String(),
    },
    { additionalProperties: false }
);

export type ImageUploadDtoType = Static<typeof ImageUploadDto>;
