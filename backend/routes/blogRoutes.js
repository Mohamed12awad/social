const { Router } = require("express");
const routes = Router();
const blogController = require("../controllers/blogController");
const { authMiddleware } = require("../controllers/authController");

routes.get("/all", blogController.getAllBlogs);
routes.get("/", authMiddleware, blogController.getBlogs);
routes.get("/:id", blogController.singleBlog);
routes.post("/", authMiddleware, blogController.addBlog);
routes.put("/:id", authMiddleware, blogController.editBlog);
routes.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = routes;
