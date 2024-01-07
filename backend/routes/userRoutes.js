const { Router } = require("express");
const routes = Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../controllers/authController");

routes.get("/", authMiddleware, userController.get_users);
routes.get("/singleuser", authMiddleware, userController.get_singleUser);
routes.post("/signup", userController.signUp);
routes.post("/secondVerify/:id", userController.signUpVerify);
routes.get("/verify/:token", userController.varify);
routes.post("/login", userController.login);
routes.get("/logout", authMiddleware, userController.logOut);
routes.put("/:id", userController.edit_user);
routes.delete("/:id", authMiddleware, userController.delete_user);

module.exports = routes;
