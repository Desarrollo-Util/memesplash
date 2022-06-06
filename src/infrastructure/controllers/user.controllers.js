import { userRegisterUseCase } from '../../application/use-cases/user-register.usecase.js';

export const userRegisterController = async (req, res, next) => {
    const { id, name, email, password } = req.body;

    try {
        await userRegisterUseCase(id, name, email, password);

        res.status(201).send();
    } catch (err) {
        next(err);
    }
};
