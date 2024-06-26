require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/model_users");
const mongoose = require('mongoose');

function cryptografaSenha(senha, salt) {
    const hash = crypto.createHmac("sha256", salt);
    hash.update(senha);
    return hash.digest("hex");
}

function validaSenha(senha) {

    const errors = 
    typeof senha !== 'string' ? "Senha invalida" :
    senha.length < 8 ? "A senha deve ter no minimo 8 caracteres" :
    /\s/.test(senha) ? "A senha não pode conter espaços em branco" :
    null;

    return errors;
}

async function criar(req, res) {
    const { email, senha } = req.body;
    const salt = crypto.randomBytes(16).toString("hex");

    try {
        const errors = validaSenha(senha);

        if (errors) {
            return res.status(400).json({ errors });
        }

        const newUsuario = await Usuario.create({
            email,
            senha: cryptografaSenha(senha, salt),
            salt,
        });
        res.status(201).json({
            id: newUsuario._id.toString(),
            email: newUsuario.email,
            senha: newUsuario.senha,
            salt: newUsuario.salt,
        });
        
    } catch (error) {
        handleError(error, res);
    }
}

function handleError(error, res) {
    if (error instanceof mongoose.Error.ValidationError) {
        const errors = formatarErrosDeValidacao(error);
        res.status(400).json({ errors });
    } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

function formatarErrosDeValidacao(error) {
    const errors = {};

    for (let field in error.errors) {
        if (error.errors.hasOwnProperty(field)) {
            errors[field] = error.errors[field].message;
        }
    }

    if (Object.keys(errors).length === 1) {
        return Object.values(errors)[0];
    }

    return errors;
}

async function login(req, res) {
    try {
        if (!req.body.email || !req.body.senha) {
            return res
                .status(400)
                .json({ msg: "Email e senha são obrigatórios" });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(401).json({ msg: "Acesso negado" });
        }

        const senhaValida =
            usuario.senha === cryptografaSenha(req.body.senha, usuario.salt);
        if (!senhaValida) {
            return res.status(401).json({ msg: "Acesso negado" });
        }

        const token = jwt.sign({ email: usuario.email }, process.env.SEGREDO, {
            expiresIn: "1h",
        });

        res.json({msg: "Login realizado com sucesso" , token});
    } catch (error) {
        res.status(500).json({ errors: "Erro interno no servidor" });
    }
}

module.exports = { criar, login };