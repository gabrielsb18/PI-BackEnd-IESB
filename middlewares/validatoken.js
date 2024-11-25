const jwt = require("jsonwebtoken");
require("dotenv").config();

function validaToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ msg: "Token não fornecido!" });
    }
  
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  
    if (!token) {
      return res.status(401).json({ msg: "Token mal formatado!" });
    }
  
    try {
      const decoded = jwt.verify(token.replace(/"/g, ''), process.env.SEGREDO);
      req.userId = decoded.userId;
      req.email = decoded.email;
      next();
    } catch (error) {
      res.status(401).json({ msg: "ACESSO NEGADO!" });
    }
  }
  
  

module.exports = {validaToken}