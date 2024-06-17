const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

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
        expect(result.type).toBe("application/json")
    })

    test("Deve retornar 400 no POST /users", async () => {
        const result = await request.post("/users").send({
            email: "cruzdemalta gmail.com",
            senha: "abcdefgh",
        });
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
    });
})