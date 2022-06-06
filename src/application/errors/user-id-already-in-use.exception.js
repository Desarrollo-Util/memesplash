import { ApplicationConflictException } from './application-conflict.exception.js';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('El ID de usuario ya está en uso');
    }
}
