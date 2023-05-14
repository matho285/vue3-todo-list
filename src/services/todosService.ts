import type { TodoItem } from '@/types';

const PROJECT_TOKEN = import.meta.env.VITE_MOCKAPI_KEY;
const TODOLISTS_URL = 'https://' + PROJECT_TOKEN + '.mockapi.io/api/v1/todolists/';

function getTodos(todolistId: string) {
  return fetch(TODOLISTS_URL + todolistId + '/todos', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error while loading todos!');
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function addTodo(todolistId: string, newTodo: Partial<TodoItem>): Promise<TodoItem> {
  return fetch(TODOLISTS_URL + todolistId + '/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // Send your data in the request body as JSON
    body: JSON.stringify(newTodo),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while adding todo!');
  });
}
function deleteTodo(todolistId: string, todoId: string) {
  return fetch(TODOLISTS_URL + todolistId + '/todos/' + todoId, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while deleting todo!');
  });
}
function updateTodo(todolistId: string, todoId: string, todoUpdate: Partial<TodoItem>) {
  return fetch(TODOLISTS_URL + todolistId + '/todos/' + todoId, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(todoUpdate),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while updating todo!');
  });
}

export default {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
