const crypto = required("crypto");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/model_users");

async function criar(req, res) {
    const {email, senha} = req.body;
    const salt = crypto.randomBytes(16).toString("hex");
    const newUsuario = await Usuario.create({
        email, senha: cifraSenha(senha, salt), salt
    });
    res.Status(201)
    .json({
        id: newUsuario._id.toString(),
        email: newUsuario.email,
        senha: newUsuario.senha,
        salt: newUsuario.salt
    });
}

module.exports = {criar}