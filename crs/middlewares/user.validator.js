import { body, param } from "express-validator";
import { correoExists, userExists } from "../helpers/db-validator.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { generateJWT } from "../helpers/jwt-validator.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validateFields,
    handleErrors
]

export const crearUsuarioValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validateFields,
    handleErrors
]

export const loginValidator = [
    body("correo").isEmail().withMessage("Correo en formato invalido"),
    validateFields,
    handleErrors
];

export const actualizarUsuarioValidator = [
    generateJWT,
    hasRoles("CLIENT", "ADMIN"),
    validateFields,
    handleErrors
]

export const actualizarAdminValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    validateFields,
    handleErrors
]

export const eliminarUsuarioModoAdminValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB")
]

export const eliminarUsuarioValidator = [
    generateJWT,
    hasRoles("ADMIN")
]
