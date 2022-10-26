import { Type } from '@sinclair/typebox';
import { Dto, Prop } from '../utils/typebox-decorators';

// TODO: Validations

@Dto({ additionalProperties: false })
export class UserTokenDto {
    @Prop(Type.String())
    token!: string;
}
