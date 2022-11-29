import { Dto, Prop } from '@shared/infrastructure/utils/typebox-decorators';
import { Type } from '@sinclair/typebox';

// TODO: Validations
@Dto({ additionalProperties: false })
export class UserLoginDto {
    @Prop(Type.String())
    email!: string;
    @Prop(Type.String())
    password!: string;
}
