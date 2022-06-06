import { UserModel } from '../../domain/models/user.model.js';
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
    static toDomain(persistanceUser) {
        const { _id, email, name, password, profilePic, images } =
            persistanceUser;

        return new UserModel(_id, name, email, password, profilePic, images);
    }

    /**
     * Transforms a domain user into a database user
     * @param {UserModel} domainUser Domain user
     * @returns Database user
     */
    static toPersistance(domainUser) {
        const { id, name, email, password, profilePic, images } = domainUser;

        return {
            _id: id,
            name,
            email,
            password,
            profilePic,
            images,
        };
    }

    /**
     * Finds a user by id
     * @param {String} id User id
     * @returns Domain user
     */
    static async findById(id) {
        const userFound = await UserSchema.findById(id).exec();

        if (!userFound) return null;

        return UserRepository.toDomain(userFound);
    }

    /**
     * Finds a user by email
     * @param {String} email User email
     * @returns Domain user
     */
    static async findByEmail(email) {
        const userFound = await UserSchema.findOne({ email }).exec();

        if (!userFound) return null;

        return UserRepository.toDomain(userFound);
    }

    /**
     * Persists a new user
     * @param {UserModel} domainUser Domain user
     */
    static async create(domainUser) {
        const persistanceUser = UserRepository.toPersistance(domainUser);

        const user = new UserSchema(persistanceUser);

        await user.save();
    }
}
