const app = require("../app");

const supertest = require("supertest");
const request = supertest(app);

let id = null;

describe("API Notes - Tarefas diarias", function(){
    test("Deve retornar um 200 no GET /notes", async function() {
        const request = await request.get("/notes"); 
        expect(response.status).tobe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
    });
    
    test("Deve esperar um 404 no GET /notes/id", async function (){
        const request = await request
        .get("/notes/id");
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });
});