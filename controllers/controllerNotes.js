const mongoose = require("mongoose");
const Notes = require("../models/model_notes");

// async function criar(req, res) {
//     const nota = await Notes.create(req.body);
//     res.status(201).json(nota);
// }

async function criar (req, res){
    try {
        const { titulo, descricao, status } = req.body;
        const userId = req.body.usuario;
        
        if(!userId){
            return res.status(400).json({msg: "Usuário não informado"})
        }

        const nota = await Notes.create({
            titulo,
            descricao,
            status,
            usuario: userId
        })

        res.status(201).json({msg: "Nota criada com sucesso", nota});
    } catch (error) {
        res.status(500).jsom({msg: "Erro ao criar nota", error});
    }
}

async function validaDados(req, res, next) {
    const nota = new Notes(req.body);
    try {
        await nota.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: "Dados invalidos!" });
    }
}

//Atualização ao listar as notas de um usuario
// async function listarNotes(req, res) {
//     const notas = await Notes.find({});
//     res.json(notas);
// }

async function listarNotes(req, res){

    const userId = req.userId;

    try {
        const notas = await Notes.find({usuario: userId}).populate("usuario");
        res.json(notas);
    } catch (error){ 
        console.error("Erro ao buscar notas:", error);
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
    // const id = new mongoose.Types.ObjectId(req.params.id);
    // const nota = await Notes.findOneAndUpdate({ _id: id }, req.body);
    // res.json(nota);

    const id = new mongoose.Types.ObjectId(req.params.id);
    const { titulo, descricao, status, usuario } = req.body;

    try {
        console.log("Dados recebidos:", req.body);

        const nota = await Notes.findOneAndUpdate(
            { _id: id },
            { titulo, descricao, status, usuario }, // Atualiza title, content e status
            { new: true } // Retorna o documento atualizado
        );

        if (!nota) {
            return res.status(404).json({ msg: "Nota não encontrada" });
        }

        console.log("ID recebido:", req.params.id);

        res.json(nota);
    } catch (error) {
        console.error(error); // Log de erro para depuração
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
