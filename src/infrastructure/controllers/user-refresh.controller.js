import { signAsync } from '../services/jwt.service.js';

export class UserRefreshController {
    async execute(req, res, next) {
        const { userId } = req;

        try {
            const payload = { id: userId };
            const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

            const token = await signAsync(payload, signOptions);

            return res.send({ token });
        } catch (err) {
            next(err);
        }
    }
}
