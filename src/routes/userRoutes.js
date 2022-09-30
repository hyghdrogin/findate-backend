const { Router } = require("express");
const UserController = require("../controllers/User");
const Authentication = require("../middleware/auth");
const parser = require("../middleware/upload");

const router = Router();
const { verifyToken } = Authentication;
const {
  registerUser, loginUser, updateUserProfile, getUsers, updateUserProfilePicture, getUserById
} = UserController;

router.post("/users/signin", loginUser);
router.post("/users/signup", registerUser);

router.get("/users", verifyToken, getUsers);
router.get("/user", verifyToken, getUserById);

router.put("/user-profile", verifyToken, updateUserProfile);
router.put("/user-profile/image", verifyToken, parser.single("image"), updateUserProfilePicture);

module.exports = router;
