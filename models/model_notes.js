const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    
    titulo: {
        type: String,
        required: true
    },
    
    descricao: {
        type: String
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Notes", NotesSchema);