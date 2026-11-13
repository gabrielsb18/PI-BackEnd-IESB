const app = require("../app");
const mongoose = require("mongoose")
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Usuario = require("../models/model_users");

describe("API notes-Usuarios", function () {

    let testUserId;
    let token;

    beforeAll(async () => {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.createHmac("sha256", salt);
        hash.update("senhaTest123");
        const senhaCriptografada = hash.digest("hex");

        const testUser = await Usuario.create({
            _id: new mongoose.Types.ObjectId(),
            nome: "Fulano",
            email: "fulano123@hotmail.com",
            senha: senhaCriptografada,
            salt: salt,
        })

        testUserId = testUser._id.toString();
        token = jwt.sign({ userId: testUserId }, process.env.SEGREDO)
    }
    )

    test("Deve retornar 201 no POST /users", async () => {
        const result = await request.post("/users")
            .send({
                nome: "Usuario",
                email: "fulano1234@hotmail.com",
                senha: "abcdefg123_H",
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
            email: "fulano123@hotmail.com",
            senha: "senhaTest123",
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
            email: "fulano123@hotmail.com",
            senha: "Senhaqualquer",
        });
        expect(result.status).toBe(401);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg");
    })

    test("Deve retornar 404 no PUT /users/id quando o usuario não for encontrado", async () => {
        const idInexistente = new mongoose.Types.ObjectId();
        const geraEmailAleatorio = `teste${Date.now()}@example.com`;
        const result = await request.put(`/users/${idInexistente}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                email: geraEmailAleatorio
            })
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Usuario não encontrado");
    })

    test("Deve retornar 400 no PUT /users/id em caso de email já cadastrado", async () => {
        const result = await request.put(`/users/${testUserId}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                email: "fulano1234@hotmail.com",
            })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Email já cadastrado");
    })

    test("Deve retornar 400 no PUT /users/id caso a senha antiga não seja fornecida", async () => {
        const result = await request.put(`/users/${testUserId}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                senha: "dihfGSsanf123_"
            })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Você precisa informar sua senha antiga");
    })

    test("Deve retornar 400 no PUT /users/id caso a senha antiga esteja incorreta", async () => {
        const result = await request.put(`/users/${testUserId}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                senha: "dihfGSsanf123_",
                senha_antiga: "passwordIncorrect"
            })
        expect(result.status).toBe(400);
        expect(result.type).toBe("application/json");
        expect(result.body).toHaveProperty("msg", "Senha antiga inválida");
    })

    test("Deve retornar 200 no PUT /users/id caso os dados sejam atualizados com sucesso", async () => {
        const result = await request.put(`/users/${testUserId}`)
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