import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { NameVO } from '@shared/domain/value-objects/name.vo';
import { PasswordVO } from '@shared/domain/value-objects/password.vo';
import { ProfilePicVO } from '@shared/domain/value-objects/profile-pic.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { injectable } from 'inversify';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
import { UserSchema } from '../schemas/user.schema';
import { IUser } from '../types/schemas/user-doc.interface';

/**
 * User MongoDB repository implementation
 */
@injectable()
export class UserRepository implements IUserRepository {
    /**
     * Transforms a database user into a domain user
     * @param persistanceUser Database user
     * @returns Domain user
     */
    private toDomain(persistanceUser: IUser) {
        const { _id, email, name, password, profilePic } = persistanceUser;

        return new UserModel(
            new UuidVO(_id),
            new NameVO(name),
            new EmailVO(email),
            new PasswordVO(password),
            profilePic ? new ProfilePicVO(profilePic) : null
        );
    }

    /**
     * Transforms a domain user into a database user
     * @param domainUser Domain user
     * @returns Database user
     */
    private toPersistance(domainUser: UserModel) {
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
     * @param id User id
     * @returns Domain user
     */
    async findById(id: UuidVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    async findByEmail(email: EmailVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({
            email: email.value,
        }).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Persists a new user
     * @param domainUser Domain user
     */
    async create(domainUser: UserModel): Promise<void> {
        const persistanceUser = this.toPersistance(domainUser);

        const user = new UserSchema(persistanceUser);

        await user.save();
    }

    /**
     * Updates a user
     * @param domainUser Domain user
     */
    async update(domainUser: UserModel): Promise<void> {
        const persistanceUser = this.toPersistance(domainUser);

        const { _id, ...rest } = persistanceUser;

        await UserSchema.findByIdAndUpdate(_id, rest).exec();
    }
}
