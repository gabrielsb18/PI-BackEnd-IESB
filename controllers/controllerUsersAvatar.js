const mongoose = require("mongoose");
const Usuario = require("../models/model_users");
const DiskStorage = require("../providers/DiskStorage");

class controllerUsersAvatar {
    async update(req, res) {
        const userId = req.userId;
        const avatarFilename = req.file.filename;

        const diskStorage = new DiskStorage();

        const user = await Usuario.findById(userId);
        
        if (!user) {
            return res.status(401).json({ msg: "Somente usuários autenticados podem mudar o avatar" });
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await Usuario.findOneAndUpdate({ _id: userId }, { avatar: filename });

        return res.status(201).json({msg: "Foto atualizada com sucesso", user})
    }
}

module.exports = controllerUsersAvatar;