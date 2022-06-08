export const expectStatusCode = (t, expectedCode, response) => {
    t.is(
        response.statusCode,
        expectedCode,
        `Expected status code ${expectedCode}, but received ${response.statusCode}`
    );
};
