const fs = require('fs');
const path = require('path');
const uploadConfig = require("../config/upload")
const { supabase } = require("../config/supabaseClient");

async function saveFile(file) {
    const filePath = path.resolve(uploadConfig.TMP_FOLDER, file.filename);

    const fileBuffer = await fs.promises.readFile(filePath);

    const { data, error } = await supabase.storage.from('avatars-notes')
        .upload(`uploads/${file.filename}`, fileBuffer, {
            contentType: file.mimetype,
            upsert: true,
        });

    if (error) {
        throw new Error(`Erro ao salvar arquivos: ${error.message}`);
    }

    await fs.promises.unlink(filePath);

    return data.path;
}

async function downloadFile(fileName) {
    const { data, error } = await supabase.storage
        .from('avatars-notes')
        .download(fileName);

    if (error) {
        throw new Error(`Erro ao baixar arquivo: ${error.message}`);
    }

    return data;
}

async function deleteFile(fileName) {
    const { error } = await supabase.storage.from('avatars-notes')
        .remove([fileName]);

    if (error) {
        throw new Error(`Erro ao deletar arquivo: ${error.message}`);
    }
}

module.exports = { saveFile, deleteFile, downloadFile };