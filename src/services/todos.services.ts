import { Todo, Todos } from '../types/todo.type';
const store = new Map<Todo['id'], Todo>();

let iterator = 0;

function listTodos(): Todos {
  return Array.from(store.values());
}

function createTodo(title: Todo['title']) {
  const todo: Todo = {
    id: ++iterator,
    title,
    completed: false,
  };
  store.set(todo.id, todo);
  return todo;
}

function updateTodo(id: Todo['id'], title: Todo['title']): void {
  const todo = store.get(id);
  if (todo) {
    todo.title = title;
  }
}

function deleteTodo(id: Todo['id']): void {
  store.delete(id);
}

export { listTodos, createTodo, updateTodo, deleteTodo };
