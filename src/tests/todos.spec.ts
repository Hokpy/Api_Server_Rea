import { createTodo, listTodos } from '../services/todos.services';

describe('todos services', () => {
  test('create todo is empty', () => {
    const all = listTodos();
    expect(all).toEqual([]);
  });
  test('create and list todos', () => {
    const todo = createTodo('test todo');

    const all = listTodos();
    expect(all).toEqual([todo]);
  });

  test('wrong made', () => {
    //@ts-ignore

    expect(() => createTodo()).toThrow('Title is required');
  });
});
