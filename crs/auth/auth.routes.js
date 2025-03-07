import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { uploadProfilePicture } from '../middlewares/multer-uploads.js';
import { registerValidator, loginValidator } from "../middlewares/user.validator.js"; // Corrected path

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", loginValidator, login);

export default router;