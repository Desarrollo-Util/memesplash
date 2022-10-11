import { ApplicationConflictException } from './application-conflict.exception';

export class UserEmailAlreadyInUseException extends ApplicationConflictException {
    constructor() {
        super('El email ya está en uso');
    }
}
