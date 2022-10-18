import { FastifyReply, FastifyRequest } from 'fastify';
import { SignOptions } from 'jsonwebtoken';
import { signAsync } from '../services/jwt.service';

export class UserRefreshController {
    async execute(req: FastifyRequest, res: FastifyReply) {
        const { userId } = req;

        const payload = { id: userId };
        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return res.send({ token });
    }
}
