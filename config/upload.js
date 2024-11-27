const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// Pasta temporária para salvar os arquivos
const TMP_FOLDER = path.resolve(__dirname, "..", "tmp");

// Pasta onde os arquivos serão salvos
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

// Configuração do multer,(biblioteca para upload de arquivos)
const MULTER = {
    // Destino dos arquivos
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        // Nome do arquivo
        // O nome do arquivo será um hash de 10 caracteres + o nome original do arquivo
        // Assim garantimos que as imagens tenham nomes diferentes para que uma não sobreponha a outra
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
};

module.exports = {
    MULTER,
    TMP_FOLDER,
    UPLOADS_FOLDER,
}