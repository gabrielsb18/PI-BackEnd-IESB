const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

let id = null;

describe("API Notes - Tarefas diarias", function(){
    test("Deve retornar um 200 no GET /notes", async function() {
        const request = await request.get("/notes"); 
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
    });
    
    test("Deve esperar um 404 no GET /notes/id", async function (){
        const request = await request 
        .get("/notes/id");
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 201 no POST /notes", async function(){
        const result = await request.post("/notes")
        .send({
            titulo: "Tarefas de Hoje",
            descricao: "Estudar sobre JWT, Revisar Metricas de Software, catar coco do cachorro"
        }),
        id = result.body._id.toString();
        expect(result.status).toBe(204);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 422 no POST /notes", async function(){
        const result = await request.post("/notes")
        .send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json");

    })
});