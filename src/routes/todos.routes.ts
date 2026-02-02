import { Router } from 'express';
import { listTodos, createTodo, updateTodo } from '../services/todos.services';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    items: listTodos(),
    message: 'List of todos',
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params ?? {};
  const { title } = req.body ?? {};

  if (!title) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title is required',
    });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title must be a string',
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title must be empty',
    });
  }

  const todo = updateTodo(+id, title);
  if (todo !== null) {
    res.status(200).json({
      item: todo,
      message: 'Todo updated',
    });
  } else {
    res.status(404).json({
      status: 'Not found',
      message: 'Todo not found',
    });
  }
});
router.post('/', (req, res) => {
  const { title } = req.body ?? {};

  if (!title) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title is required',
    });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title must be a string',
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Title must be empty',
    });
  }

  const todo = createTodo(title);

  res.status(201).json({
    item: todo,
    message: 'Todo created',
  });
});

export default router;
