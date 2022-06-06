import { hash } from 'bcrypt';
import uuid from 'uuid-random';
import { InvalidEmailFormatException } from '../errors/invalid-email-format.exception.js';
import { InvalidIdFormatException } from '../errors/invalid-id-format.exception.js';
import { InvalidNameFormatException } from '../errors/invalid-name-format.exception.js';
import { InvalidPasswordFormatException } from '../errors/invalid-password-format.exception.js';

const HASH_SALT = 10;

/**
 * Registered user in the application
 */
export class UserModel {
    /**
     * Constructor
     * @param {String} id User unique identifier
     * @param {String} name User name
     * @param {String} email User email
     * @param {String} password User hashed password
     * @param {String} profilePic User profile picture URL
     * @param {String[]} images User uploaded image IDs
     */
    constructor(id, name, email, password, profilePic, images) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.images = images;
    }

    static validateId(id) {
        return uuid.test(id);
    }

    static validateName(name) {
        const nameRegex =
            /^(?![\s-])(?!.*[\s-]{2})(?!.*[\s-]$)[A-Z\s-]{2,30}$/i;

        return nameRegex.test(name);
    }

    static validateEmail(email) {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(email);
    }

    static validatePassword(password) {
        return (
            password.length >= 8 &&
            password.length <= 30 &&
            !password.includes(' ')
        );
    }

    static async create(id, name, email, password) {
        if (!UserModel.validateId(id)) {
            throw new InvalidIdFormatException();
        }
        if (!UserModel.validateName(name)) {
            throw new InvalidNameFormatException();
        }
        if (!UserModel.validateEmail(email)) {
            throw new InvalidEmailFormatException();
        }
        if (!UserModel.validatePassword(password)) {
            throw new InvalidPasswordFormatException();
        }

        const hashedPassword = await hash(password, HASH_SALT);

        return new UserModel(id, name, email, hashedPassword, undefined, []);
    }
}
