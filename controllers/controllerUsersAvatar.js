const Usuario = require("../models/model_users");
const DiskStorage = require("../providers/DiskStorage");

async function updateUserAvatar(req, res) {
    const userId = req.userId;

    const user = await Usuario.findById(userId);

    if (!user) {
        return res.status(401).json({ msg: "Somente usuários autenticados podem mudar o avatar" });
    }

    if (user.avatar) {
        await DiskStorage.deleteFile(`uploads/${user.avatar}`);
    }

    const filePath = await DiskStorage.saveFile(req.file);
    const avatarFilename = filePath.replace("uploads/", "");
    user.avatar = avatarFilename;

    await Usuario.findOneAndUpdate({ _id: userId }, { avatar: avatarFilename });

    return res.status(201).json({ msg: "Foto atualizada com sucesso", user })
}

async function showAvatar(req, res) {
    const { file } = req.params;

    try {
        const data = await DiskStorage.downloadFile(`uploads/${file}`);

        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set('Content-Type', data.type);

        return res.send(buffer);
        
    } catch (error) {

        return res.status(404).json({ msg: "Imagem não encontrada" });

    }
}

module.exports = { updateUserAvatar, showAvatar };