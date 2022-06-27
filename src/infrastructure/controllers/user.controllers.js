import { userLoginUseCase } from '../../application/use-cases/user-login.usecase.js';
import { userRegisterUseCase } from '../../application/use-cases/user-register.usecase.js';
import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';
import { signAsync } from '../services/jwt.service.js';

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

export const userLoginController = async (req, res, next) => {
    const { email, password, ...rest } = req.body;

    try {
        if (!email || !password) throw new MissingFieldsFormatException();

        if (Object.keys(rest).length !== 0)
            throw new UnnecesaryFieldsFormatException();

        const id = await userLoginUseCase(email, password);

        const payload = { id };
        const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

        const token = await signAsync(payload, signOptions);

        return res.send({ token });
    } catch (err) {
        next(err);
    }
};
