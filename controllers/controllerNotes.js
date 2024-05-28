const mongoose = require("mongoose");
const nota = require("../models/model_notes");

async function criar(req,res) {
    const nota = await nota.create(req.body);
    res.status(201).json(nota);
}

async function listarNotes(req,res){
    const notas = await nota.find({}) 
    res.json(notas)
}

async function buscarPeloID(req,res, next){
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const nota = await nota.findOne({_id:id})
        next()
    } catch (err) {
        res.status(404).json({msg:"Produto não encontrado"})
    }
}

async function obterNota(req,res, next){
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const nota = await nota.findOne({_id:id})
        res.json(nota)
        next()
    } catch (err) {
        res.status(404).json({msg:"Produto não encontrado"})
    }
}

module.exports={criar, listarNotes, buscarPeloID, obterNota}