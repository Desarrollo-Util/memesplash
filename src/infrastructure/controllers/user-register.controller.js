import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';

export class UserRegisterController {
    constructor({ userRegisterUseCase }) {
        this.userRegisterUseCase = userRegisterUseCase;
    }

    async execute(req, res, next) {
        const { id, name, email, password, ...rest } = req.body;

        try {
            if (!id || !name || !email || !password)
                throw new MissingFieldsFormatException();

            if (Object.keys(rest).length !== 0)
                throw new UnnecesaryFieldsFormatException();

            await this.userRegisterUseCase.execute(id, name, email, password);

            res.status(201).send();
        } catch (err) {
            next(err);
        }
    }
}
