import jsonwebtoken from 'jsonwebtoken';

const jwtSecret = process.env.JWT_PRIVATE_KEY || 'default_jwt_secret';

export const signAsync = (payload, signOptions) =>
    new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, jwtSecret, signOptions, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });

export const verifyAsync = (token) =>
    new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, jwtSecret, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
