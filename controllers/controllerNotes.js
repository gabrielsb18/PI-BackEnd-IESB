const mongoose = require("mongoose");
const nota = require("../models/model_notes");

async function criar(req,res) {
    const nota = await nota.create(req.body);
    res.status(201).json(nota);
}

function listarNotes(req,res){

}

function listarNotaPeloID(req,res){

}

module.exports={criar, listarNotes,listarNotaPeloID}