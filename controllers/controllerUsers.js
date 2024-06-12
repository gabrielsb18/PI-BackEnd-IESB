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

async function login(req, res) {
    const usuario = await Usuario.findOne({ email: req.body.email });
    console.log(usuario.senha, usuario.salt)
    if (usuario.senha === cryptografaSenha(req.body.senha, usuario.salt)) {
        res.json({
            token: jwt.sign({ email: usuario.email }, process.env.SECRET, {
                expiresIn: "1h",
            }),
        });
    } else {
        res.status(401).status({ msg: "Acesso negado" });
    }
}

module.exports = {criar, login}