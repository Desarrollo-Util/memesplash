import test from 'ava';
import { generateRandomUser } from './utils/generate-random-user';
import { expectStatusCode } from './utils/generic-expects';
import { app, setupTests } from './utils/setup-tests';

setupTests(test);

const resgisterEndponit = '/users/register';

test('Register succesfully', async (t) => {
    const user = generateRandomUser();
    const response = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: user,
    });

    expectStatusCode(t, 201, response);
});

test('Register failed - Duplicated ID', async (t) => {
    const userOk = generateRandomUser();
    const userFail = {
        ...generateRandomUser(),
        id: userOk.id,
    };

    const responseOk = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: userOk,
    });

    expectStatusCode(t, 201, responseOk);

    const responseFail = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: userFail,
    });

    expectStatusCode(t, 409, responseFail);
});

test('Register failed - Duplicated email', async (t) => {
    const userOk = generateRandomUser();
    const userFail = {
        ...generateRandomUser(),
        email: userOk.email,
    };

    const responseOk = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: userOk,
    });

    expectStatusCode(t, 201, responseOk);

    const responseFail = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: userFail,
    });

    expectStatusCode(t, 409, responseFail);
});

test('Register failed - Invalid ID format', async (t) => {
    const user = {
        ...generateRandomUser(),
        id: 'invalid-uuid',
    };

    const response = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid name format', async (t) => {
    const user = {
        ...generateRandomUser(),
        name: 'name-with-./*',
    };

    const response = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid email format', async (t) => {
    const user = {
        ...generateRandomUser(),
        email: 'emailatemail.com',
    };

    const response = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

test('Register failed - Invalid password format', async (t) => {
    const user = {
        ...generateRandomUser(),
        password: '1234',
    };

    const response = await app.inject({
        method: 'POST',
        url: resgisterEndponit,
        payload: user,
    });

    expectStatusCode(t, 400, response);
});

// test('Register failed - Missing fields', async (t) => {
//     const { id, name, email } = testUserA;

//     const user = { id, name, email };

//     const response = await app.inject({
//         method: 'POST',
//         url: resgisterEndponit,
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
//         url: resgisterEndponit,
//         payload: user,
//     });

//     expectStatusCode(t, 400, response);
// });
