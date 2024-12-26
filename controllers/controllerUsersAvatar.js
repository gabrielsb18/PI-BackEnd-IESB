const Usuario = require("../models/model_users");
const DiskStorage = require("../providers/DiskStorage");

async function updateUserAvatar(req, res) {
    const userId = req.userId;
    const avatarFilename = req.file.filename;

    const user = await Usuario.findById(userId);

    if (!user) {
        return res.status(401).json({ msg: "Somente usuários autenticados podem mudar o avatar" });
    }

    if (user.avatar) {
        await DiskStorage.deleteFile(user.avatar);
    }

    const filename = await DiskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await Usuario.findOneAndUpdate({ _id: userId }, { avatar: filename });

    return res.status(201).json({ msg: "Foto atualizada com sucesso", user })
}

module.exports = { updateUserAvatar };