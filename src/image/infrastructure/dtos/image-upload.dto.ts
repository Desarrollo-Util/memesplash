import { Dto, Prop } from '@shared/infrastructure/utils/typebox-decorators';
import { Type } from '@sinclair/typebox';
import { File } from 'fastify-multer/lib/interfaces';
import { FileDTO } from '../utils/file-dto';

@Dto({ additionalProperties: false })
export class ImageUploadDto {
    @Prop(Type.String())
    id!: string;
    @Prop(Type.String())
    title!: string;
    @Prop(FileDTO)
    image!: File;
}
