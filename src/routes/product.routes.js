const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/product.controller");
const upload = require("../middleware/upload");

// Create product with image upload
router.post("/", auth(["user", "admin"]), upload.single("image"), productController.createProduct);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", auth(["user", "admin"]), upload.single("image"), productController.updateProduct);
router.delete("/:id", auth(["user", "admin"]), productController.deleteProduct);

module.exports = router;
