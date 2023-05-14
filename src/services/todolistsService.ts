import type { Todolist } from '@/types';

const PROJECT_TOKEN = import.meta.env.VITE_MOCKAPI_KEY;
const TODOLISTS_URL = 'https://' + PROJECT_TOKEN + '.mockapi.io/api/v1/todolists/';
function getTodolists(): Promise<Todolist[]> {
  return fetch(TODOLISTS_URL, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while loading todolists!');
  });
}

function addTodolist(newTodolist: Partial<Todolist>): Promise<Todolist> {
  return fetch(TODOLISTS_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newTodolist),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while loading todolists!');
  });
}
function deleteTodolist(todolistId: string) {
  return fetch(TODOLISTS_URL + todolistId, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Error while deleting todolists!');
  });
}

export default {
  getTodolists,
  addTodolist,
  deleteTodolist,
};
