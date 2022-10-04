import { UserModel } from '../../domain/models/user.model.js';
import { EmailVO } from '../../domain/value-objects/email.vo.js';
import { NameVO } from '../../domain/value-objects/name.vo.js';
import { PasswordVO } from '../../domain/value-objects/password.vo.js';
import { ProfilePicVO } from '../../domain/value-objects/profile-pic.vo.js';
import { UuidVO } from '../../domain/value-objects/uuid.vo.js';
import { UserSchema } from '../schemas/user.schema.js';

/**
 * User MongoDB repository implementation
 */
export class UserRepository {
    /**
     * Transforms a database user into a domain user
     * @param {*} persistanceUser Database user
     * @returns Domain user
     */
    toDomain(persistanceUser) {
        const { _id, email, name, password, profilePic } = persistanceUser;

        return new UserModel(
            new UuidVO(_id),
            new NameVO(name),
            new EmailVO(email),
            new PasswordVO(password),
            profilePic ? new ProfilePicVO(profilePic) : undefined
        );
    }

    /**
     * Transforms a domain user into a database user
     * @param {UserModel} domainUser Domain user
     * @returns Database user
     */
    toPersistance(domainUser) {
        const { id, name, email, password, profilePic } = domainUser;

        return {
            _id: id.value,
            name: name.value,
            email: email.value,
            password: password.value,
            profilePic: profilePic ? profilePic.value : undefined,
        };
    }

    /**
     * Finds a user by id
     * @param {String} id User id
     * @returns Domain user
     */
    async findById(id) {
        const userFound = await UserSchema.findById(id.value).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Finds a user by email
     * @param {String} email User email
     * @returns Domain user
     */
    async findByEmail(email) {
        const userFound = await UserSchema.findOne({
            email: email.value,
        }).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Persists a new user
     * @param {UserModel} domainUser Domain user
     */
    async create(domainUser) {
        const persistanceUser = this.toPersistance(domainUser);

        const user = new UserSchema(persistanceUser);

        await user.save();
    }

    async update(domainUser) {
        const persistanceUser = this.toPersistance(domainUser);

        const { _id, ...rest } = persistanceUser;

        await UserSchema.findByIdAndUpdate(_id, rest).exec();
    }
}
