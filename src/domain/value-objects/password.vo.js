import { compare, hash } from 'bcrypt';
import { VOFormatException } from '../errors/vo-format.exception.js';
import { ValueObject } from '../value-object.js';

const HASH_SALT = 10;

export class PasswordVO extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof PasswordVO &&
            this.value === valueObject.value
        );
    }

    assertIsValid(_) {}

    static async create(plainPassword) {
        if (
            plainPassword.length < 8 ||
            plainPassword.length > 30 ||
            plainPassword.includes(' ')
        ) {
            throw new VOFormatException(PasswordVO.name, plainPassword);
        }

        const hashedPassword = await hash(plainPassword, HASH_SALT);

        return new PasswordVO(hashedPassword);
    }

    compare(plainPasswordVO) {
        return compare(plainPasswordVO.value, this.value);
    }
}
