import { Router } from "express";
import { createProductValidator, getProductsValidator, getProductValidator, editProductValidator, getOutOfStockProductsValidator, getBestSellingProductsValidator, updateProductPictureValidator, filterProductsValidator, deleteProductValidator } from "../middlewares/productos.validator.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { createProduct, getProducts, getProduct, updateProduct, getOutOfStockProducts, getBestSellingProducts, updateProductPicture, filterProducts, deleteProduct } from "./productos.controller.js";    

const router = Router();

router.post("/createProduct", uploadProductPicture.single("productPicture"), createProductValidator, createProduct);

router.get("/getProducts", getProductsValidator, getProducts);

router.get("/getProduct/:pid", getProductValidator, getProduct);

router.put("/updateProduct/:pid", editProductValidator, updateProduct);

router.patch("/updateProductPicture/:pid", updateProductPictureValidator, uploadProductPicture.single("newProductPicture"), updateProductPicture);

router.get("/outOfStock", getOutOfStockProductsValidator, getOutOfStockProducts);

router.get("/getBestSelling", getBestSellingProductsValidator, getBestSellingProducts);

router.get("/filter", filterProductsValidator, filterProducts);

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

export default router;