import { Router } from "express";
import { addCategory, listCategories, updateCategory, removeCategory } from "./categoria.controller.js";
import { addCategoryValidator, listCategoriesValidator, updateCategoryValidator, removeCategoryValidator } from "../middlewares/categoria.validator.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.get("/listCategories", listCategoriesValidator, listCategories);

router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

router.patch("/removeCategory/:cid", removeCategoryValidator, removeCategory);

export default router;