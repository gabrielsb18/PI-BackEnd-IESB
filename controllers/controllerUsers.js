require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/model_users");
const RefreshToken = require("../models/model_usersToken");
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
            msg: "Usuario criado com sucesso",
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
            return res.status(401).json({ msg: "Usuario não encontrado" });
        }

        const senhaValida =
            usuario.senha === cryptografaSenha(req.body.senha, usuario.salt);
        if (!senhaValida) {
            return res.status(401).json({ msg: "Senha incorreta" });
        }

        const acessToken = jwt.sign({ email: usuario.email }, process.env.SEGREDO, {
            expiresIn: "2h",
        });

        const refreshToken = jwt.sign({ email: usuario.email }, process.env.SEGREDO_REFRESH, {
            expiresIn: "2d",
        });

        await RefreshToken.findOneAndUpdate(
            { User_id: usuario._id },
            { Token: refreshToken, createdAt: Date.now() },
            { upsert: true, new: true }
        );

        res.json({
            msg: "Login realizado com sucesso" ,
            acessToken,
            refreshToken
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ msg: "Erro interno no servidor" });
    }
}

async function renovaToken(req, res){
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(409).json({msg: "Refresh Token não fornecido"});
    }

    try {

        const token = await RefreshToken.findOne({Token: refreshToken});

        if(!token){
            return res.status(403).json({
                msg: "Token expirado"
            })
        }

        const payload = jwt.verify(refreshToken, process.env.SEGREDO_REFRESH);

        const newAcessToken = jwt.sign({email:payload.email}, process.env.SEGREDO, {expiresIn: "2h"});

        res.json({acessToken: newAcessToken})
    } catch(error){

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Token invalido" });
        }

    }
}

module.exports = { criar, login, renovaToken};