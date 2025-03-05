import { body } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { generateJWT } from "../helpers/jwt-validator.js";
import { hasRoles } from "./validate-roles.js";

export const addCategoryValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    validateFields,
    handleErrors
];

export const listCategoriesValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    validateFields,
    handleErrors
];

export const updateCategoryValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    validateFields,
    handleErrors
];

export const removeCategoryValidator = [
    generateJWT,
    hasRoles("ADMIN"),
    validateFields,
    handleErrors
];