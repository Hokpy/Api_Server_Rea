import { Router } from 'express';
import { listTodos, createTodo, updateTodo, deleteTodo } from '../services/todos.services';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      items: listTodos(),
      message: 'List of todos',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Internal server error',
      message: 'Failed to fetch todos',
    });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params ?? {};
    const { title } = req.body ?? {};

    // Validate ID
    if (!id || isNaN(+id) || +id <= 0) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Valid ID is required',
      });
    }

    // Validate title
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

    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Title cannot be empty',
      });
    }

    const todo = updateTodo(+id, trimmedTitle);
    if (todo !== null) {
      res.status(200).json({
        item: todo,
        message: 'Todo updated successfully',
      });
    } else {
      res.status(404).json({
        status: 'Not found',
        message: 'Todo not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Internal server error',
      message: 'Failed to update todo',
    });
  }
});

router.post('/', (req, res) => {
  try {
    const { title } = req.body ?? {};

    // Validate title
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

    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Title cannot be empty', // Fixed: changed from "must be empty"
      });
    }

    const todo = createTodo(trimmedTitle);

    res.status(201).json({
      item: todo,
      message: 'Todo created successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Internal server error',
      message: 'Failed to create todo',
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params ?? {};

    // Validate ID
    if (!id || isNaN(+id) || +id <= 0) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'Valid ID is required',
      });
    }

    const todo = deleteTodo(+id);
    if (todo !== null) {
      res.status(200).json({
        item: todo,
        message: 'Todo deleted successfully',
      });
    } else {
      res.status(404).json({
        status: 'Not found',
        message: 'Todo not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Internal server error',
      message: 'Failed to delete todo',
    });
  }
});

export default router;
