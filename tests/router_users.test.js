const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Usuario = require("../models/model_users");

let id = null;

describe("API notes-Usuarios", function(){
    
    test("Deve retornar 201 no POST /users", async()=>{
        const geraEmailAleatorio = `teste${Date.now()}@example.com`;
        const result = await request.post("/users")
        .send({
            email: geraEmailAleatorio,
            senha:"abcdefgh",
        })
        id=result.body.id.toString();
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 400 no POST /users - Erro: Email com espaços em branco", async () => {
        const result = await request.post("/users").send({
            email: "cruzdemalta gmail.com",
            senha: "abcdefgh",
        });
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("errors");
    });

    test("Deve retornar 500 em caso de erro no servidor", async ()=>{
        jest.spyOn(Usuario, 'create').mockImplementation(() => {
            throw new Errors("Erro interno do servidor");
        });

        const result = await request.post("/users").send({
            email: "testeDeErroInterno@gmail.com",
            senha: "SenhaSegura"
        });
        expect(result.status).toBe(500);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("error");
    })
});