import test from 'ava';
import { generateRandomUser } from './utils/generate-random-user';
import { expectStatusCode } from './utils/generic-expects';
import { app, setupTests } from './utils/setup-tests';

setupTests(test);

const testUserA = generateRandomUser();
const testUserB = generateRandomUser();

test.serial('Register succesfully', async (t) => {
    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: testUserA,
    });

    expectStatusCode(t, 201, response);
});

test.serial('Register failed - Duplicated ID', async (t) => {
    const user = {
        ...testUserB,
        id: testUserA.id,
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 409, response);
});

test.serial('Register failed - Duplicated email', async (t) => {
    const user = {
        ...testUserB,
        email: testUserA.email,
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 409, response);
});

test('Register failed - Invalid ID format', async (t) => {
    const user = {
        ...testUserA,
        id: 'invalid-uuid',
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid name format', async (t) => {
    const user = {
        ...testUserA,
        name: 'name-with-./*',
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid email format', async (t) => {
    const user = {
        ...testUserA,
        email: 'emailatemail.com',
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid password format', async (t) => {
    const user = {
        ...testUserA,
        password: '1234',
    };

    const response = await app.inject({
        method: 'POST',
        url: '/users/register',
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

// test('Register failed - Missing fields', async (t) => {
//     const { id, name, email } = testUserA;

//     const user = { id, name, email };

//     const response = await app.inject({
//         method: 'POST',
//         url: '/users/register',
//         payload: user,
//     });

//     expectStatusCode(t, 400, response);
// });

// test('Register failed - Unnecesary fields', async (t) => {
//     const user = {
//         ...testUserA,
//         age: 25,
//     };

//     const response = await app.inject({
//         method: 'POST',
//         url: '/users/register',
//         payload: user,
//     });

//     expectStatusCode(t, 400, response);
// });
