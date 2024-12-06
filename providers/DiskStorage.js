const fs = require('fs');
const path = require('path');
const uploadConfig = require("../config/upload")

//O modulo fs permite a gente trabalhar com arquivos no node
//O modulo path permite que a gente trabalhe com caminhos de arquivos

class DiskStorage {

    //Salvando o arquivo
    async saveFile(file){

        //rename = move o arquivo de um lugar para o outro
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    //Deleta o arquivo
    async deleteFile(file){
       const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
       
       try {
            //stat = retorna status do arquivo, se ele existe ou não ou se está corrompido
            await fs.promises.stat(filePath);
       } catch {
            return;
       }

       // unlink = deleta o arquivo
       await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;