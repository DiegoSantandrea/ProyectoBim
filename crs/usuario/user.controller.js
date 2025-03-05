import { hash, verify } from 'argon2';
import Usuarios from "./user.model.js"

export const registrarUsuario = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.contra);
        data.contra = encryptedPassword;
        
        const user = await Usuarios.create(data);
        
        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            nombre: user.nombre,
            correo: user.correo
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
}

export const modificarUsuario = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const existingUser = await Usuarios.findById(usuario._id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const passwordMatch = await verify(existingUser.contra, data.contra);
        if (!passwordMatch) {
            return res.status(403).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        const usuarioActualizado = await Usuarios.findOneAndUpdate(
            usuario, { $set: data }, { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(403).json({
                success: false,
                message: "No se puede actualizar el usuario"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Usuario actualizado exitosamente",
            usuarioActualizado
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: err.message
        });
    }
}

export const modificarModoAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const adminActualizar = await Usuarios.findOneAndUpdate(
            { _id: uid, rol: { $ne: "ADMIN" } }, { $set: data }, { new: true }
        );

        if (!adminActualizar) {
            return res.status(403).json({
                success: false,
                message: "No se puede actualizar el modo admin"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Modo admin actualizado exitosamente",
            adminActualizar
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el modo admin",
            error: err.message
        });
    }
}

export const desactivarUsuarioModoAdmin = async (req, res) => {
    try {
        const { uid } = req.params

        const usuarioParaEliminar = await Usuarios.findOneAndUpdate(
            { _id: uid, rol: { $ne: "ADMIN" } }, { status: false }, { new: true }
        );

        if (!usuarioParaEliminar) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario desactivado exitosamente",
            usuarioParaEliminar
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al desactivar el usuario",
            error: err.message
        });
    }
}

export const desactivarUsuario = async (req, res) => {
    try {
        const { usuario } = req;
        const eliminarUsuario = await Usuarios.findOneAndUpdate(usuario, { status: false }, { new: true })
        if (!eliminarUsuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Usuario desactivado exitosamente",
            eliminarUsuario
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al desactivar el usuario",
            error: err.message
        })
    }
}