import { Type } from '@sinclair/typebox';
import { Dto, Prop } from '../utils/typebox-decorators';

// TODO: Validations
@Dto({ additionalProperties: false })
export class UserLoginDto {
    @Prop(Type.String())
    email!: string;
    @Prop(Type.String())
    password!: string;
}
