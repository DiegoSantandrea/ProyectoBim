import { Router } from "express";
import { createProductValidator, getProductsValidator, getProductValidator, editProductValidator, getOutOfStockProductsValidator, getBestSellingProductsValidator, updateProductPictureValidator, filterProductsValidator, deleteProductValidator } from "../middlewares/productos.validator.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { createProduct, getProducts, getProduct, updateProduct, getOutOfStockProducts, getBestSellingProducts, updateProductPicture, filterProducts, deleteProduct } from "./productos.controller.js";    

const router = Router();

/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productPicture:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *                 description: The product name
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 description: The product price
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Product added successfully
 */
router.post("/createProduct", uploadProductPicture.single("productPicture"), createProductValidator, createProduct);

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: List all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get("/getProducts", getProductsValidator, getProducts);

/**
 * @swagger
 * /getProduct/{pid}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 */
router.get("/getProduct/:pid", getProductValidator, getProduct);

/**
 * @swagger
 * /updateProduct/{pid}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 description: The product price
 *                 example: 999.99
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/updateProduct/:pid", editProductValidator, updateProduct);

/**
 * @swagger
 * /updateProductPicture/{pid}:
 *   patch:
 *     summary: Update a product picture
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newProductPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product picture updated successfully
 */
router.patch("/updateProductPicture/:pid", updateProductPictureValidator, uploadProductPicture.single("newProductPicture"), updateProductPicture);

/**
 * @swagger
 * /outOfStock:
 *   get:
 *     summary: List all out-of-stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Out-of-stock products retrieved successfully
 */
router.get("/outOfStock", getOutOfStockProductsValidator, getOutOfStockProducts);

/**
 * @swagger
 * /getBestSelling:
 *   get:
 *     summary: List best-selling products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Best-selling products retrieved successfully
 */
router.get("/getBestSelling", getBestSellingProductsValidator, getBestSellingProducts);

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Filter products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products filtered successfully
 */
router.get("/filter", filterProductsValidator, filterProducts);

/**
 * @swagger
 * /deleteProduct/{pid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

export default router;