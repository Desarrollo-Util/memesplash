import { Dto, Prop } from '@shared/infrastructure/utils/typebox-decorators';
import { Type } from '@sinclair/typebox';

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
