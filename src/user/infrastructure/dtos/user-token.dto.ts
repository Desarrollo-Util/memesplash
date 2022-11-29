import { Dto, Prop } from '@shared/infrastructure/utils/typebox-decorators';
import { Type } from '@sinclair/typebox';

// TODO: Validations

@Dto({ additionalProperties: false })
export class UserTokenDto {
    @Prop(Type.String())
    token!: string;
}
