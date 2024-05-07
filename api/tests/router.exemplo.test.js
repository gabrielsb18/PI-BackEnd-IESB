const supertest = require('supertest');

const app = require('../app')

const request = supertest(app);

describre('API LOJA VIRTUAL', () => {
    test('Deve retornar CODIGO e CORPO')
})