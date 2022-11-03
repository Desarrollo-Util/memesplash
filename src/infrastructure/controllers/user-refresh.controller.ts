import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'inversify';
import { SignOptions } from 'jsonwebtoken';
import { UserTokenDto } from '../dtos/user-token.dto';
import { signAsync } from '../services/jwt.service';

@injectable()
export class UserRefreshController {
    async execute(
        _req: FastifyRequest,
        res: FastifyReply
    ): Promise<UserTokenDto> {
        const { userId } = res;

        const payload = { id: userId };
        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return { token };
    }
}
