import { Type } from '@sinclair/typebox';

export const FileDTO = Type.Object(
    {
        fieldname: Type.String(),
        slug: Type.String(),
        filename: Type.Optional(Type.String()),
        originalname: Type.String(),
        encoding: Type.String(),
        mimetype: Type.String(),
        buffer: Type.Optional(Type.Any()),
        stream: Type.Optional(Type.Any()),
        size: Type.Optional(Type.Number()),
        destination: Type.Optional(Type.String()),
        path: Type.Optional(Type.String()),
    },
    { isFile: true }
);
