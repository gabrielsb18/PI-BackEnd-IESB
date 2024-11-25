const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    
    titulo: {
        type: String,
        required: true
    },
    
    descricao: {
        type: String
    },
    
    createdData: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pendente', 'concluida'],
        default: 'pendente'
    },

})

module.exports = mongoose.model("Notes", NotesSchema);