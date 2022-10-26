import { randEmail, randFullName, randPassword, randUuid } from '@ngneat/falso';

export const generateRandomUser = () => ({
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    password: randPassword({ size: 15 }),
});
