import { Router } from "express";
import { addCategory, listCategories, updateCategory, removeCategory } from "./categoria.controller.js";
import { addCategoryValidator, listCategoriesValidator, updateCategoryValidator, removeCategoryValidator } from "../middlewares/categoria.validator.js";

const router = Router();

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: The category name
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category added successfully
 */
router.post("/agregarCategoria", addCategoryValidator, addCategory);

/**
 * @swagger
 * /listarCategorias:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
router.get("/listarCategorias", listCategoriesValidator, listCategories);

/**
 * @swagger
 * /editarCategoria/{cid}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: The category name
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/editarCategoria/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /eliminarCategoria/{cid}:
 *   patch:
 *     summary: Remove a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category removed successfully
 */
router.patch("/eliminarCategoria/:cid", removeCategoryValidator, removeCategory);

export default router;