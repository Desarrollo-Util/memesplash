import { InvalidUserFormatException } from '../errors/invalid-user-format.exception.js';
import { EmailVO } from '../value-objects/email.vo.js';
import { NameVO } from '../value-objects/name.vo.js';
import { PasswordVO } from '../value-objects/password.vo.js';
import { UuidVO } from '../value-objects/uuid.vo.js';

/**
 * Registered user in the application
 */
export class UserModel {
    /**
     * Constructor
     * @param {UuidVO} id User unique identifier
     * @param {NameVO} name User name
     * @param {EmailVO} email User email
     * @param {PasswordVO} password User hashed password
     * @param {ProfilePicVO} profilePic User profile picture URL
     */
    constructor(id, name, email, password, profilePic) {
        this.assertIsValid(id, name, email, password);

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
    }

    static createUser(id, name, email, password) {
        return new UserModel(id, name, email, password, undefined);
    }

    assertIsValid(id, name, email, password) {
        if (
            !(id instanceof UuidVO) ||
            !(name instanceof NameVO) ||
            !(email instanceof EmailVO) ||
            !(password instanceof PasswordVO)
        )
            throw new InvalidUserFormatException();
    }
}
