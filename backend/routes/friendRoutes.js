const { Router } = require("express");
const routes = Router();
const friendController = require("../controllers/friendRequestController");
const { authMiddleware } = require("../controllers/authController");

//friends operation
// friends operation
routes.get("/", authMiddleware, friendController.get_friends);
routes.get("/sent", authMiddleware, friendController.get_requestsSent);
routes.get("/received", authMiddleware, friendController.get_requestsReceived);
routes.post("/send/:id", authMiddleware, friendController.post_sendRequest);
routes.delete(
  "/DeleteRequest/:id",
  authMiddleware,
  friendController.delete_friendRequest
);
routes.delete(
  "/remove/:id",
  authMiddleware,
  friendController.delete_removeFriend
);
routes.post("/accept/:id", authMiddleware, friendController.post_acceptRequest);

module.exports = routes;
