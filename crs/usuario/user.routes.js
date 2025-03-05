import { Router } from "express";
import { registrarUsuario, modificarUsuario, desactivarUsuario, modificarModoAdmin, desactivarUsuarioModoAdmin } from "./user.controller.js";
import { crearUsuarioValidator, actualizarUsuarioValidator, eliminarUsuarioValidator, eliminarUsuarioModoAdminValidator, actualizarAdminValidator } from "../middlewares/user-validator.js";

const router = Router()

router.post("/agregarUsuario", crearUsuarioValidator, registrarUsuario)

router.put("/actualizarUsuario/", actualizarUsuarioValidator, modificarUsuario)

router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, modificarModoAdmin)

router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, desactivarUsuarioModoAdmin)

router.patch("/eliminarUsuario/", eliminarUsuarioValidator, desactivarUsuario)

export default router