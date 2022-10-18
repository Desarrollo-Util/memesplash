import { EmailVO } from '../value-objects/email.vo';
import { NameVO } from '../value-objects/name.vo';
import { PasswordVO } from '../value-objects/password.vo';
import { ProfilePicVO } from '../value-objects/profile-pic.vo';
import { UuidVO } from '../value-objects/uuid.vo';

/**
 * Registered user in the application
 */
export class UserModel {
    /**
     * Constructor
     * @param id User unique identifier
     * @param name User name
     * @param email User email
     * @param password User hashed password
     * @param profilePic User profile picture URL
     */
    constructor(
        public readonly id: UuidVO,
        public name: NameVO,
        public email: EmailVO,
        public password: PasswordVO,
        public profilePic: ProfilePicVO | null
    ) {}

    static createUser(
        id: UuidVO,
        name: NameVO,
        email: EmailVO,
        password: PasswordVO
    ) {
        return new UserModel(id, name, email, password, null);
    }
}
