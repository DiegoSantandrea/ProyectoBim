import { Router } from "express";
import { registrarUsuario, modificarUsuario, desactivarUsuario, modificarModoAdmin, desactivarUsuarioModoAdmin } from "./user.controller.js";
import { crearUsuarioValidator, actualizarUsuarioValidator, eliminarUsuarioValidator, eliminarUsuarioModoAdminValidator, actualizarAdminValidator } from "../middlewares/user.validator.js";

const router = Router()

/**
 * @swagger
 * /agregarUsuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post("/agregarUsuario", crearUsuarioValidator, registrarUsuario)

/**
 * @swagger
 * /actualizarUsuario:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.put("/actualizarUsuario/", actualizarUsuarioValidator, modificarUsuario)

/**
 * @swagger
 * /actualizarModoAdmin/{uid}:
 *   put:
 *     summary: Actualiza el modo admin de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modoAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Modo admin actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, modificarModoAdmin)

/**
 * @swagger
 * /eliminarUsuarioModoAdmin/{uid}:
 *   patch:
 *     summary: Desactiva un usuario en modo admin
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, desactivarUsuarioModoAdmin)

/**
 * @swagger
 * /eliminarUsuario:
 *   patch:
 *     summary: Desactiva un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.patch("/eliminarUsuario/", eliminarUsuarioValidator, desactivarUsuario)

export default router