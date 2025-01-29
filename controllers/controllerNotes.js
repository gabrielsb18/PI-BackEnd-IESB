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
            _id: new mongoose.Types.ObjectId(),
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
        const notas = await Notes.find({usuario: userId}).sort({ createdAt: -1 }).populate("usuario");
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

    res.status(204).end();
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

        res.json({msg: "Nota atualizada com sucesso", nota});
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar a nota", error });
    }
}

async function pesquisaNotas(req, res) {
    const userId = req.userId;
    const { term } = req.query;

    if(!term){
        return res.status(400).json({
            msg: "Informe um termo para pesquisa"
        });
    }

    if(!userId){
        return res.status(400).json({msg: "Usuário não informado"})
    }

    try {
        const notes = await Notes.find({
            usuario: userId,
            $or: [
                {titulo: { $regex: term, $options: "i" }},
                {descricao: { $regex: term, $options: "i" }}
            ]
        })
        
        res.status(200).json(notes);

    } catch(error) {
        res.status(500).json({msg: "Erro ao pesquisar notas", error});
    }
}

async function totalNotas (req, res){
    try {
        const userId = req.userId;

        if(!userId){
            return res.status(400).json({msg: "Usuário não informado"});
        }

        const pendente = await Notes.countDocuments({usuario: userId, status: "pendente"});
        const concluida = await Notes.countDocuments({usuario: userId, status: "concluida"});

        return res.status(200).json({ pendente, concluida });
    } catch(error) {
        return res.status(500).json({msg: "Erro ao buscar quantidade de notas", error});
    }
}


module.exports = {
    criar,
    listarNotes,
    buscarPeloID,
    obterNota,
    pesquisaNotas,
    totalNotas,
    remover,
    atualizar,
    validaDados,
};
