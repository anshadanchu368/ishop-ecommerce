const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const router = express.Router();

const { isAuthenticator, authorizedRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticator, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticator, authorizedRoles("admin"), getSingleOrder);
router.route("/order/me").get(isAuthenticator, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticator, authorizedRoles("admin"), getAllOrders);

  router.route("/admin/order/:id").put(isAuthenticator,authorizedRoles("admin"),updateOrder).delete(isAuthenticator,authorizedRoles("admin"),deleteOrder)

module.exports = router;
