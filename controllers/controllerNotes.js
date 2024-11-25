const mongoose = require("mongoose");
const Notes = require("../models/model_notes");

async function criar (req, res){
    const userId = req.userId;

    if(!userId){
        return res.status(400).json({msg: "Usuário não informado"})
    }

    try {
        const { titulo, descricao, status } = req.body;

        const nota = await Notes.create({
            titulo,
            descricao,
            status,
            usuario: userId
        })

        res.status(201).json({msg: "Nota criada com sucesso", nota});
    } catch (error) {
        res.status(500).json({msg: "Erro ao criar nota", error});
    }
}

async function validaDados(req, res, next) {
    const { titulo, descricao, status } = req.body;
    const usuario = req.userId;

    if (!titulo || !descricao || !status || !usuario) {
        return res.status(422). json ({msg: "Todos os campos são obrigatórios!"});
    }

    try {
        const nota = new Notes({ titulo, descricao, status, usuario });
        await nota.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: "Dados invalidos!" });
    }
}

async function listarNotes(req, res){

    const userId = req.userId;

    try {
        const notas = await Notes.find({usuario: userId}).populate("usuario");
        res.json(notas);
    } catch (error){ 
        res.status(500).json({msg: "Erro ao listar notas", error});
    }
}

async function buscarPeloID(req, res, next) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const nota = await Notes.findOne({ _id: id });
        next();
    } catch (err) {
        res.status(404).json({ msg: "Nota não encontrada" });
    }
}

async function obterNota(req, res, next) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const nota = await Notes.findOne({ _id: id });
        res.json(nota);
        next();
    } catch (err) {
        res.status(404).json({ msg: "Nota não encontrado" });
    }
}

async function remover(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const nota = await Notes.findOneAndDelete({ _id: id });

    if (!nota) {
        return res.status(404).json({ msg: 'Nota não encontrada' });
    }

    res.status(200).json({ msg: 'Nota excluída com sucesso!'});
}

async function atualizar(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const { titulo, descricao, status, usuario } = req.body;

    try {

        const nota = await Notes.findOneAndUpdate(
            { _id: id },
            { titulo, descricao, status, usuario },
            { new: true }
        );

        if (!nota) {
            return res.status(404).json({ msg: "Nota não encontrada" });
        }

        console.log("ID recebido:", req.params.id);

        res.json(nota);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar a nota", error });
    }
}


module.exports = {
    criar,
    listarNotes,
    buscarPeloID,
    obterNota,
    remover,
    atualizar,
    validaDados,
};
