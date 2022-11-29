import { Dto, Prop } from '@shared/infrastructure/utils/typebox-decorators';
import { Type } from '@sinclair/typebox';

@Dto({ additionalProperties: false })
export class ImageUploadDto {
    @Prop(Type.String())
    id!: string;
    @Prop(Type.String())
    title!: string;
}
