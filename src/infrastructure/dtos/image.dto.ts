import { Type } from '@sinclair/typebox';
import { Dto, Prop } from '../utils/typebox-decorators';

// TODO: Validations
@Dto({ additionalProperties: false })
export class ImageDto {
    @Prop(Type.String())
    id!: string;
    @Prop(Type.String())
    ownerId!: string;
    @Prop(Type.String())
    title!: string;
    @Prop(Type.String())
    slug!: string;
    @Prop(Type.String())
    format!: string;
    @Prop(Type.Integer())
    size!: number;
    @Prop(Type.Integer())
    height!: number;
    @Prop(Type.Integer())
    width!: number;
    @Prop(Type.Integer())
    createdAt!: number;
}
