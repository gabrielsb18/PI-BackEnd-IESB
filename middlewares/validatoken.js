const jwt = require("jsonwebtoken");
require("dotenv").config();

function validaToken(req, res, next) {
    const token = req.headers["authorization"]
    try {
        (jwt.verify(token, process.env.SEGREDO))
        next()
    } catch (error) {
        res.status(401).json({msg: "ACESSO NEGADO!"})
    }
}

module.exports = {validaToken}