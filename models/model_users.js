const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },

    nome: {
        type: String,
        required: [true, "Nome de usuário é obrigatório"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Obrigatório o preenchimento do email"],
        trim: true,
        validate: [
            {
                validator: async function (value) {
                    const user = await mongoose.models.Usuario.findOne({
                        email: value,
                    });
                    return !user;
                },
                message: "Email já cadastrado",
            },
            {
                validator: function (value) {
                    return /\s/.test(value) === false;
                },

                message: "O email não pode conter espaços em branco",
            },
        ],
        match: [/\S+@\S+\.\S+/, "Email inválido"],
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    senha: {
        type: String,
        required: [function() { return this.authProvider === 'local'; }, "Senha é obrigatória"],
        minLength: [8, "A senha deve conter no mínimo 8 caracteres"],
        trim: true,
    },
    salt: { 
        type: String, 
        required: function() { return this.authProvider === 'local'; } 
    },
});

module.exports = mongoose.model("Usuario", userSchema);
