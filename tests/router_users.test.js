const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");

describe("API notes-Usuarios", function(){
    const geraEmailAleatorio = `teste${Date.now()}@example.com`;
    const id = "676872080b9a51fe1a00773d";
    const token = jwt.sign({ userId: id }, process.env.SEGREDO);

    test("Deve retornar 201 no POST /users", async()=>{
        const result = await request.post("/users")
        .send({
            nome: "Usuario",
            email: geraEmailAleatorio,
            senha:"abcdefg123_H",
        })
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

    test("Deve retornar 200 em caso de sucesso no POST /users/login", async () => {
        const result = await request.post("/users/login").send({
            email: geraEmailAleatorio,
            senha: "abcdefg123_H",
        });
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 400 em caso de erro no POST /users/login", async () => {
        const result = await request.post("/users/login").send({
            email: "",
            senha: "teste8181_",
        });
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg");
    });

    test("Deve retornar 401 no POST/users/login", async () => {
        const result = await request.post("/users/login").send({
            email: geraEmailAleatorio,
            senha: "Senhaqualquer",
        });
        expect(result.status).toBe(401);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg");
    })

    test("Deve retornar 404 no PUT /users/id quando o usuario não for encontrado", async () => {
        const id = "60e0f6b6d3f7b62b9c0d8b0b";  

        const result = await request.put(`/users/${id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
            email: "novoEmail@gmail.com",
        })
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Usuario não encontrado");
    })

    test("Deve retornar 400 no PUT /users/id em caso de email já cadastrado", async() => { 
        const result = await request.put(`/users/${id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
            email: "rainier@gmail.com",
        })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Email já cadastrado");
    })

    test("Deve retornar 400 no PUT /users/id caso a senha antiga não seja fornecida", async() => { 
        const result = await request.put(`/users/${id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
            senha: "dihfGSsanf123_"
        })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Você precisa informar sua senha antiga");
    })

    test("Deve retornar 400 no PUT /users/id caso a senha antiga esteja incorreta", async() => { 
        const result = await request.put(`/users/${id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
            senha: "dihfGSsanf123_",
            senha_antiga: "passwordIncorrect"
        })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Senha antiga inválida");
    })

    test("Deve retornar 200 no PUT /users/id caso os dados sejam atualizados com sucesso", async() => { 
        const result = await request.put(`/users/${id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
            nome: "NewName",
            email: "NewEmail_@gmail.com",
        })
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Usuário atualizado com sucesso");
    })
}); 