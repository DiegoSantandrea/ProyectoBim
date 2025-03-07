import { Router } from "express";
import { addProductToCart, getCartItems, removeProductFromCart } from "./carrito.controller.js";
import { addProductToCartValidator, getCartItemsValidator, removeProductFromCartValidator } from "../middlewares/carrito.validator.js";

const router = Router();

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 */
router.get("/get", getCartItemsValidator, getCartItems);

/**
 * @swagger
 * /addProductToCart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduct:
 *                 type: string
 *                 description: The product ID
 *                 example: "60c72b2f9b1d4c3a4c8e4b8a"
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 */
router.post("/addProductToCart", addProductToCartValidator, addProductToCart);

/**
 * @swagger
 * /removeProductFromCart/{idProduct}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 */
router.delete("/removeProductFromCart/:idProduct", removeProductFromCartValidator, removeProductFromCart);

export default router;