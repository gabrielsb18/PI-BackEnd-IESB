const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const TMP_FOLDER = path.resolve(__dirname, "..", "tmp");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
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
}