import { userRegisterUseCase } from '../../application/use-cases/user-register.usecase.js';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';

export const userRegisterController = async (req, res, next) => {
    const { id, name, email, password, ...rest } = req.body;

    try {
        if (!id || !name || !email || !password)
            throw new MissingFieldsFormatException();

        if (Object.keys(rest).length !== 0)
            throw new UnnecesaryFieldsFormatException();

        await userRegisterUseCase(id, name, email, password);

        res.status(201).send();
    } catch (err) {
        next(err);
    }
};
