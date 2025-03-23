const fs = require('fs');
const path = require('path');
const uploadConfig = require("../config/upload")
const { supabase } = require("../config/supabaseClient");

async function saveFile(file) {
    const filePath = path.resolve(uploadConfig.TMP_FOLDER, file);

    const fileBuffer = await fs.promises.readFile(filePath);

    const { data, error } = await supabase.storage.from('avatars-notes')
        .upload(`uploads/${file}`, fileBuffer, {
            contentType: 'image/jpg, image/png, image/jpeg',
            upsert: true,
        });

    if (error) {
        throw new Error(`Erro ao salvar arquivos: ${error.message}`);
    }

    supabase.storage
        .from("avatars-notes")
        .getPublicUrl(data.path);

    await fs.promises.unlink(filePath);

    return data.path;
}

async function deleteFile(fileName) {
    const { error } = await supabase.storage.from('avatars-notes')
        .remove([fileName]);

    if (error) {
        throw new Error(`Erro ao deletar arquivo: ${error.message}`);
    }
}

module.exports = { saveFile, deleteFile };