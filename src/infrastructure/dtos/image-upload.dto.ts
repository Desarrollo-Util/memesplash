import { Type } from '@sinclair/typebox';
import { Dto, Prop } from '../utils/typebox-decorators';

@Dto({ additionalProperties: false })
export class ImageUploadDto {
    @Prop(Type.String())
    id!: string;
}
