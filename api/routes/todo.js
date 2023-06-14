import express from "express";
const router = express.Router();
import {
  createTodo,
  allTodos,
  singleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import verifyToken from "../middleware/verifyJwtToken.js";

router.get("/all", verifyToken, allTodos);
router.post("/", verifyToken, createTodo);
router
  .route("/:id")
  .get(verifyToken, singleTodo)
  .put(verifyToken, updateTodo)
  .delete(verifyToken, deleteTodo);

export default router;
