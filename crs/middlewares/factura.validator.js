import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { generateJWT } from "../helpers/jwt-validator.js";
import {body, param } from "express-validator";
import { userExists } from "../helpers/db-validator.js";


export const confirmPurchaseValidator = [
    generateJWT,
    hasRoles("USER_ROLE"),
    validateFields,
    handleErrors
]

export const getPurchasesValidator = [
    generateJWT,
    hasRoles("USER_ROLE"),
    validateFields,
    handleErrors
]

export const getBillUserValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").notEmpty().isMongoId().withMessage("Invalid user id").custom(userExists),
    validateFields,
    handleErrors
]