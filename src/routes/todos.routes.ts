import { Router } from "express";
import { listTodos, createTodo } from "../services/todos.services";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    items: listTodos(),
    message: "List of todos",
  });
});

router.post("/", (req, res) => {
  const { title } = req.body ?? {};

  if (!title) {
    return res.status(400).json({
      status: "Bad request",
      message: "Title is required",
    });
  }

  if (typeof title !== "string") {
    return res.status(400).json({
      status: "Bad request",
      message: "Title must be a string",
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      status: "Bad request",
      message: "Title must be empty",
    });
  }

  const todo = createTodo(title);

  res.status(201).json({
    item: todo,
    message: "Todo created",
  });
});

export default router;
