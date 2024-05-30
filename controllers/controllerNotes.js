const mongoose = require("mongoose");
const Notes = require("../models/model_notes");

async function criar(req,res) {
    const nota = await Notes.create(req.body);
    res.status(201).json(nota);
}

async function validaDados(req, res, next){
    const nota = new Notes(req.body)
    try{
        await nota.validate();
        next();
    }catch(err){
        res.status(422).json({msg:"Dados invalidos!"})
    };
}

async function listarNotes(req,res){
    const notas = await Notes.find({}) 
    res.json(notas)
}

async function buscarPeloID(req,res, next){
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const nota = await Notes.findOne({_id:id})
        next()
    } catch (err) {
        res.status(404).json({msg:"Produto não encontrado"})
    }
}

async function obterNota(req,res, next){
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const nota = await Notes.findOne({_id:id})
        res.json(nota)
        next()
    } catch (err) {
        res.status(404).json({msg:"Produto não encontrado"})
    }
}

async function remover(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const nota = await Notes.findOneAndDelete({ _id: id });
    res.status(204).end();
}

async function atualizar(req,res){
    const id = new mongoose.Types.ObjectId(req.params.id);
    const nota = await Notes.findOneAndUpdate({_id: id },req.body)
    res.json(nota);
} 

module.exports={criar, listarNotes,buscarPeloID, obterNota,remover, atualizar, validaDados}