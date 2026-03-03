const dbhandler = require('./db-handler');

beforeAll(async () => {
    await dbhandler.connect();
});

afterAll(async () => {
    await dbhandler.closeDatabase();
});

jest.setTimeout(30000);