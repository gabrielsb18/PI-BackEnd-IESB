const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

let id = null;

describe("API Notes - Tarefas diarias", function(){

    test("Deve retornar 201 no POST /notes", async ()=>{
        const result = await request.post("/notes")
        .send({
            titulo: "Tarefas de Hoje",
            descricao: "Estudar sobre JWT, Revisar Metricas de Software, catar coco do cachorro"
        });
        id = result.body._id.toString();
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 422 no POST /notes", async ()=>{
        const result = await request.post("/notes")
        .send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json")
    });
    
    test("Deve retornar um 404 no GET /notes/id", async ()=>{
        const result = await request .get("/notes/id");
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 204 no Delete /notes/id", async ()=>{
        const result = await request.delete(`/notes/${id}`);
        expect(result.status).toBe(204);
        expect(result.type).toBe("")
    });

    test("Deve retornar um 404 no Delete /notes/id",async ()=>{
        const result = await request.delete("/notes/id");
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 200 no PUT /notes/id", async ()=>{
        const result = await request.put(`/notes/${id}`)
        .send({titulo:"teste",descricao:"teste"})
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json")
    });
});