const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");

const { isAuthenticator, authorizedRoles } = require("../middleware/auth.js");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").post(logoutUser);

router.route("/me").get(isAuthenticator, getUserDetails);
router.route("/password/update").put(isAuthenticator, updatePassword);

router.route("/me/update").put(isAuthenticator, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticator, authorizedRoles("admin"), getAllUser);

router
  .route("/admin/users/:id")
  .get(isAuthenticator, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticator, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticator, authorizedRoles("admin"), deleteUser);

module.exports = router;
