import test from 'ava';
import got from 'got';
import generateRandomUser from './utils/genegenerate-random-user.js';
import { expectStatusCode } from './utils/generic-expects.js';
import { setupTests } from './utils/setup-tests.js';

setupTests(test);

const endpoint = `http://localhost:${process.env.PORT}/register`;
const testUserA = generateRandomUser();
const testUserB = generateRandomUser();

const fetchRegister = async (t, user) => {
    try {
        const response = await got.post(endpoint, {
            json: user,
            throwHttpErrors: false,
        });

        return response;
    } catch (err) {
        t.fail(err);
    }
};

test.serial('Register succesfully', async (t) => {
    const response = await fetchRegister(t, testUserA);

    expectStatusCode(t, 201, response);
});

test.serial('Register failed - Duplicated ID', async (t) => {
    const user = {
        ...testUserB,
        id: testUserA.id,
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 409, response);
});

test.serial('Register failed - Duplicated email', async (t) => {
    const user = {
        ...testUserB,
        email: testUserA.email,
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 409, response);
});

test('Register failed - Invalid ID format', async (t) => {
    const user = {
        ...testUserA,
        id: 'invalid-uuid',
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid name format', async (t) => {
    const user = {
        ...testUserA,
        name: 'name-with-./*',
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid email format', async (t) => {
    const user = {
        ...testUserA,
        email: 'emailatemail.com',
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid password format', async (t) => {
    const user = {
        ...testUserA,
        password: '1234',
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});

test('Register failed - Missing fields', async (t) => {
    const { id, name, email } = testUserA;

    const user = { id, name, email };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});

test('Register failed - Unnecesary fields', async (t) => {
    const user = {
        ...testUserA,
        age: 25,
    };

    const response = await fetchRegister(t, user);

    expectStatusCode(t, 400, response);
});
