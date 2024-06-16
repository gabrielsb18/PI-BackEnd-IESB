const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Obrigatório o preenchimento do email"],
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Email inválido"],
    },
    senha: {
        type: String,
        required: [true,"Senha é obrigatória"],
        minLength: [8,"A senha deve conter no mínimo 8 caracteres"],
        maxLength: [250, "A senha deve conter no máximo 250 caracteres"],
        trim: true,
    },
    salt: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", userSchema);
