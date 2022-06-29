import { MissingFieldsFormatException } from '../errors/missing-fields.exception.js';
import { UnnecesaryFieldsFormatException } from '../errors/unnecesary-fields.exception.js';
import { signAsync } from '../services/jwt.service.js';

export class UserLoginController {
    constructor({ userLoginUseCase }) {
        this.userLoginUseCase = userLoginUseCase;
    }

    async execute(req, res, next) {
        const { email, password, ...rest } = req.body;

        try {
            if (!email || !password) throw new MissingFieldsFormatException();

            if (Object.keys(rest).length !== 0)
                throw new UnnecesaryFieldsFormatException();

            const id = await this.userLoginUseCase.execute(email, password);

            const payload = { id };
            const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

            const token = await signAsync(payload, signOptions);

            return res.send({ token });
        } catch (err) {
            next(err);
        }
    }
}
