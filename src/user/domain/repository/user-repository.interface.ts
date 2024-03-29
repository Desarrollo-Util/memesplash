import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { UserModel } from '../models/user.model';

/**
 * User repository interface
 */
export interface IUserRepository {
    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */
    findById(id: UuidVO): Promise<UserModel | null>;

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    findByEmail(email: EmailVO): Promise<UserModel | null>;

    /**
     * Persists a new user
     * @param domainUser Domain user
     */
    create(domainUser: UserModel): Promise<void>;

    /**
     * Updates a user
     * @param domainUser Domain user
     */
    update(domainUser: UserModel): Promise<void>;
}
