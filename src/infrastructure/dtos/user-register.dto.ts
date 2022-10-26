import { Type } from '@sinclair/typebox';
import { Dto, Prop } from '../utils/typebox-decorators';

// TODO: Validations

@Dto({ additionalProperties: false })
export class UserRegisterDto {
    @Prop(Type.String())
    id!: string;
    @Prop(Type.String())
    name!: string;
    @Prop(Type.String())
    email!: string;
    @Prop(Type.String())
    password!: string;
}
