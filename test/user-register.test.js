import test from 'ava';
import { config } from 'dotenv';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import fetch from 'node-fetch';
import { bootstrap } from '../src/bootstrap.js';

config();
const endpoint = `http://localhost:${process.env.PORT}/register`;

const VALID_USER_1 = {
    id: '7c51a7b8-be68-4d89-bad2-e77ebde08329',
    name: 'Testing',
    email: 'test@test.com',
    password: 'test1234',
};

const VALID_USER_2 = {
    id: '5d9516b7-cec9-49da-b565-699cf6d3969e',
    name: 'Testing alt',
    email: 'testalt@test.com',
    password: 'test1234',
};

let mongo;

test.before(async () => {
    mongo = await MongoMemoryReplSet.create({
        replSet: {
            count: 1,
            dbName: 'memesplash',
        },
    });

    process.env.MONGODB_URI = mongo.getUri();

    await bootstrap();
});

const fetchRegister = async (t, user) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        return response;
    } catch (err) {
        t.fail(err);
    }
};

test.serial('Register succesfully', async (t) => {
    const EXPECTED_STATUS_CODE = 201;

    const response = await fetchRegister(t, VALID_USER_1);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test.serial('Register failed - Duplicated ID', async (t) => {
    const EXPECTED_STATUS_CODE = 409;

    const user = {
        ...VALID_USER_2,
        id: VALID_USER_1.id,
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test.serial('Register failed - Duplicated email', async (t) => {
    const EXPECTED_STATUS_CODE = 409;

    const user = {
        ...VALID_USER_2,
        email: VALID_USER_1.email,
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Invalid ID format', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        ...VALID_USER_1,
        id: 'invalid-uuid',
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Invalid name format', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        ...VALID_USER_1,
        name: 'name-with-./*',
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Invalid email format', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        ...VALID_USER_1,
        email: 'emailatemail.com',
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Invalid password format', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        ...VALID_USER_1,
        password: '1234',
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Missing fields', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        id: VALID_USER_1.id,
        name: VALID_USER_1.name,
        email: VALID_USER_1.email,
        // Missing password
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test('Register failed - Unnecesary fields', async (t) => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
        ...VALID_USER_1,
        age: 25,
    };

    const response = await fetchRegister(t, user);

    t.is(
        response.status,
        EXPECTED_STATUS_CODE,
        `Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`
    );
});

test.after(async () => {
    if (mongo) await mongo.stop();
});
