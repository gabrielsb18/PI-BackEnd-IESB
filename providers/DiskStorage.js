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

    const { data: { publicUrl } } = supabase.storage
        .from("avatars-notes")
        .getPublicUrl(data.path);

    await fs.promises.unlink(filePath);

    return publicUrl;
}

async function deleteFile(filePath) {
    const { error } = await supabase.storage.from('avatars-notes')
        .remove([filePath]);

    if (error) {
        throw new Error(`Erro ao deletar arquivo: ${error.message}`);
    }
}

module.exports = { saveFile, deleteFile };