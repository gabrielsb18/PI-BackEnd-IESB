const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    senha: {
        type: String,
        required: [true, "Senha é obrigatória"],
        minLength: [8, "A senha deve conter no mínimo 8 caracteres"],
        trim: true,
    },
    salt: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", userSchema);
