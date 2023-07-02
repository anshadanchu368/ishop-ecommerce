const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/productController");

const { 
  isAuthenticator, 
  authorizedRoles 
} = require("../middleware/auth");

router
   .route("/products").get(getAllProducts);

router
  .route("/admin/products/new")
  .post(isAuthenticator, authorizedRoles("admin"), createProduct);

router
  .route("/admin/products/:id")
  .put(isAuthenticator, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticator, deleteProduct);

router
  .route("/products/:id").get(getProductDetails);

router
  .route("/review").put(isAuthenticator, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticator, deleteReview );


  module.exports = router;