const jwt = require("jsonwebtoken");
require("dotenv").config();

// function validaToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader.split(' ')[1].replace(/"/g, '');
//     try {
//         jwt.verify(token, process.env.SEGREDO)
//         next()
//     } catch (error) {
//         res.status(401).json({msg: "ACESSO NEGADO!"})
//     }
// }

function validaToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    // Verifica se o cabeçalho de autorização está presente
    if (!authHeader) {
      return res.status(401).json({ msg: "Token não fornecido!" });
    }
  
    // Se o token vier com o prefixo 'Bearer ', remove o prefixo
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  
    // Verifica se o token está presente
    if (!token) {
      return res.status(401).json({ msg: "Token mal formatado!" });
    }
  
    try {
      const decoded = jwt.verify(token.replace(/"/g, ''), process.env.SEGREDO); // Verifica o token JWT
      req.userId = decoded.userId; // Define o userId extraído no request
      req.email = decoded.email;
      next();
    } catch (error) {
      res.status(401).json({ msg: "ACESSO NEGADO!" });
    }
  }
  
  

module.exports = {validaToken}