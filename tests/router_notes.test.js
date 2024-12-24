const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");

describe("API Notes - Tarefas diarias", function(){
    let noteId;
    const id = "676872080b9a51fe1a00773d";

    const tokenUser = jwt.sign({ userId: "" }, process.env.SEGREDO);
    const token = jwt.sign({ userId: id }, process.env.SEGREDO);

    test("Deve retornar 201 no POST /notes", async ()=>{
        const result = await request.post("/notes")
        .set('authorization', `Bearer ${token}`)
        .send({
            usuario: id,
            status: "pendente",
            titulo: "Tarefas de Hoje",
            descricao: "Estudar sobre JWT, Revisar Metricas de Software, catar coco do cachorro"
        });
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("nota");
        
        const { _id : ObjectId } = result.body.nota;
        noteId = ObjectId;
    });

    test("Deve retornar um 422 no POST /notes", async ()=>{
        const result = await request.post("/notes")
        .set('authorization', `Bearer ${token}`)
        .send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json")
    });

    test("Deve retornar um 200 no GET /notes", async ()=>{
        const result = await request.get("/notes")
        .set('authorization', `Bearer ${token}`) 
        expect(result.status).toBe(200);
        expect(result.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar um 200 no GET no /notes/id", async ()=> {
        const result = await request.get(`/notes/${noteId}`)
        .set('authorization', `Bearer ${token}`)
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    })
    
    test("Deve retornar um 404 no GET /notes/id", async ()=>{
        const result = await request .get("/notes/id")
        .set('authorization', `Bearer ${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar um 200 no PUT /notes/id", async ()=>{
        const result = await request.put(`/notes/${noteId}`)
        .set('authorization', `Bearer ${token}`)
        .send({
            usuario: id,
            status: "concluida",
            titulo:"teste123",              
            descricao:"teste"
        })
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json")
    });

    test("Deve retornar um 422 no PUT /notes/id com dados inválidos",async ()=>{
        const result = await request.put(`/notes/${noteId}`)
        .set('authorization', `Bearer ${token}`)
        .send({titulo:"", descricao:""})
        expect(result.status).toBe(422)
        expect(result.type).toBe("application/json")
    })

    test("Deve retornar um 404 no PUT /notes/id", async ()=>{
        const result = await request.put("/notes/id")
        .set('authorization', `Bearer ${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json")
    })

    test("Deve retornar um 204 no Delete /notes/id", async ()=>{
        const result = await request.delete(`/notes/${noteId}`)
        .set('authorization', `Bearer ${token}`)
        expect(result.status).toBe(204);
        expect(result.type).toBe("")
    });

    test("Deve retornar um 404 no Delete /notes/id",async ()=>{
        const result = await request.delete("/notes/id")
        .set('authorization', `Bearer ${token}`)
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 200 na rota GET /notes/search", async ()=> {
        const result = await request.get("/notes/search")
        .set('authorization', `Bearer ${token}`)
        .query({
            term: "Tarefas"
        })
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body).toBeInstanceOf(Array);
    })

    test("Deve retornar 400 na rota GET /notes/search caso o termo de pesquisa não seja informado", async ()=> {
        const result = await request.get("/notes/search")
        .set('authorization', `Bearer ${token}`)
        .query({})
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Informe um termo para pesquisa");
    })

    test("Deve retornar 400 na rota GET /notes/search caso o id do usuario pelo token não seja fornecido", async ()=> {
        const result = await request.get("/notes/search")
        .set("authorization", `Bearer ${tokenUser}`)
        .query({
            term: "Tarefas"
        })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Usuário não informado");
    })

    test("Deve retornar 200 na rota GET /notes/search em caso de uma lista vazia", async ()=> {
        const result = await request.get("/notes/search")
        .set("authorization", `Bearer ${token}`)
        .query({
            term: "termInexists"
        })
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body).toBeInstanceOf(Array);
    })

    test("Deve retornar 400 na rota GET /notes/totals caso o id do usuario do token não seja informado", async ()=> {
        const result = await request.get("/notes/totals")
        .set("authorization", `Bearer ${tokenUser}`)
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Usuário não informado");
    })

    test("Deve retornar 200 na rota GET /notes/totals caso o total de notas seja retornado", async ()=> {
        const result = await request.get("/notes/totals")
        .set("authorization", `Bearer ${token}`)
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("concluida");
        expect(result.body).toHaveProperty("pendente");
    })
});