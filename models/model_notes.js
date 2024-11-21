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
        enum: ['pendente', 'concluida'], // Valores permitidos para o status
        default: 'pendente' // Valor padrão
    },

    usuario: { // Adicionando referência ao usuário
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Nome do modelo de usuário
        required: true // Torna obrigatório
    }
})

module.exports = mongoose.model("Notes", NotesSchema);