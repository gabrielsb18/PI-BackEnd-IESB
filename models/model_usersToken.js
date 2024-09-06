const mongoose = require("mongoose");

const usersTokenSchema = new mongoose.Schema({
    
    User_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*60*24*7
    },

    Token: {
        type: String,
        required: true,
    }
})

const RefreshToken = mongoose.model("RefreshToken", usersTokenSchema);

module.exports = RefreshToken;