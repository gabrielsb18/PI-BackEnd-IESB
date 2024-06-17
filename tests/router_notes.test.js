const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("API Notes - Tarefas diarias", function(){

    let id = null;

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTcxODY1MDY5NCwiZXhwIjoxNzE4NjU0Mjk0fQ.lWTE-vRf6tCXCFrRgjqDyYDJoPXBPKHy1syCC-sungU"

    test("Deve retornar 201 no POST /notes", async ()=>{
        const result = await request.post("/notes")
        .set('Authorization', `${token}`)
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
        .set('Authorization', `${token}`)
        .send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json")
    });

    test("Deve retornar um 200 no GET /notes", async ()=>{
        const result = await request.get("/notes")
        .set('Authorization', `${token}`) 
        expect(result.status).toBe(200);
        expect(result.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar um 200 no GET no /notes/id", async ()=> {
        const result = await request.get(`/notes/${id}`)
        .set('Authorization', `${token}`)
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    })
    
    test("Deve retornar um 404 no GET /notes/id", async ()=>{
        const result = await request .get("/notes/id")
        .set('Authorization', `${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 200 no PUT /notes/id", async ()=>{
        const result = await request.put(`/notes/${id}`)
        .set('Authorization', `${token}`)
        .send({titulo:"teste",descricao:"teste"})
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json")
    });

    test("Deve retornar um 422 no PUT /notes/id com dados inválidos",async ()=>{
        const result = await request.put(`/notes/${id}`)
        .set('Authorization', `${token}`)
        .send({titulo:"", descricao:""})
        expect(result.status).toBe(422)
        expect(result.type).toBe("application/json")
    })

    test("Deve retornar um 404 no PUT /notes/id", async ()=>{
        const result = await request.put("/notes/id")
        .set('Authorization', `${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json")
    })

    test("Deve retornar um 204 no Delete /notes/id", async ()=>{
        const result = await request.delete(`/notes/${id}`)
        .set('Authorization', `${token}`)
        expect(result.status).toBe(204);
        expect(result.type).toBe("")
    });

    test("Deve retornar um 404 no Delete /notes/id",async ()=>{
        const result = await request.delete("/notes/id")
        .set('Authorization', `${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    
});