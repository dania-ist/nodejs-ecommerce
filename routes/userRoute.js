const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  imageProcessing,
  uploadProfileImage,
  changePassword,
  getLoggedUserData,
  changeCurrentUserPassword,
  updateCurrentUserData,
} = require("../services/userService");

const {
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
  updateCurrentUserValidator,
} = require("../validators/userValidator");

const router = express.Router();

router.get("/getMe", isAuth, getLoggedUserData, getUser);
router.put(
  "/changeMyPassword",
  isAuth,
  changeCurrentUserPassword,
  changePasswordValidator,
  changePassword
);
router.put(
  "/updateMe",
  isAuth,
  updateCurrentUserValidator,
  updateCurrentUserData
);

router
  .route("/")
  .get(
    // isAuth, allowedTo("admin"),
    getUsers
  )
  .post(
    isAuth,
    allowedTo("admin"),
    uploadProfileImage,
    imageProcessing,
    createUserValidator,
    createUser
  );

router
  .route("/:id")
  .get(
    // getBrandValidator,
    isAuth,
    allowedTo("admin"),
    getUser
  )
  .put(
    isAuth,
    allowedTo("admin"),
    uploadProfileImage,
    imageProcessing,
    updateUserValidator,
    updateUser
  )
  .delete(
    // deleteBrandValidator,
    isAuth,
    allowedTo("admin"),
    deleteUser
  );

// router.put("/changePassword/:id", changePasswordValidator, changePassword);

module.exports = router;
