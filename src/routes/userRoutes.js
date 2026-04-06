const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const userController = require("../controllers/userController");

// Only Admin can manage users
router.get("/", auth, role("admin"), userController.getAllUsers);
router.put("/:id", auth, role("admin"), userController.updateUser);
router.delete("/:id", auth, role("admin"), userController.deleteUser);

module.exports = router;
