const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/model_users");

function cryptografaSenha(senha, salt) {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(senha);
    return hash.digest('hex');
}

async function criar(req, res) {
    const {email, senha} = req.body;
    const salt = crypto.randomBytes(16).toString("hex");
    const newUsuario = await Usuario.create({
        email, senha: cryptografaSenha(senha, salt), salt
    });
    res.status(201)
    .json({
        id: newUsuario._id.toString(),
        email: newUsuario.email,
        senha: newUsuario.senha,
        salt: newUsuario.salt
    });
}

module.exports = {criar}