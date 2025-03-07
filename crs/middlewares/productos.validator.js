"use strict"
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validator.js";
import { productExists } from "../helpers/db-validator.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { generateJWT } from "../helpers/jwt-validator.js";

export const createProductValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("category").notEmpty().isMongoId().withMessage("Invalid category ID"),
    body("category").custom(categoryExists),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const getProductsValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validateFields,
    handleErrors
]

export const getProductValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().isMongoId().withMessage("Invalid product ID"),
    param("pid").custom(productExists),
    validateFields,
    handleErrors
]

export const editProductValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]

export const updateProductPictureValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().isMongoId().withMessage("Invalid product ID"),
    param("pid").custom(productExists),
    validateFields,
    deleteFileOnError,
    handleErrors

]

export const getOutOfStockProductsValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const getBestSellingProductsValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const filterProductsValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]

export const deleteProductValidator = [
    generateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]