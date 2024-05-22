const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    titulo: {type: string},
    descricao:{type:string}
})

module.exports = mongoose.model("Notes", NotesSchema);