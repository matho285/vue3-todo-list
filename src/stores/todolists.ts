import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Todolist } from '@/types';
import todolistsService from '@/services/todolistsService';

export const useTodolistStore = defineStore('todolists', () => {
  const todolists = ref<Todolist[]>([]);
  const loading = ref(false);
  const error = ref(null);

  function getTodolistById(todolistId: string) {
    return todolists.value.find((todolist) => todolist.id === todolistId);
  }

  function fetchTodolists() {
    todolists.value = [];
    loading.value = true;

    todolistsService
      .getTodolists()
      .then((loadedTodolists: Todolist[]) => {
        todolists.value = loadedTodolists;
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        loading.value = false;
      });
  }

  function addTodolist(newTodolist: Partial<Todolist>) {
    todolistsService
      .addTodolist(newTodolist)
      .then((addedTodolist: Todolist) => {
        todolists.value.push(addedTodolist);
      })
      .catch((err) => {
        error.value = err;
      });
  }

  function deleteTodolist(todolistId: string) {
    todolistsService
      .deleteTodolist(todolistId)
      .then(() => {
        todolists.value = todolists.value.filter((todolist) => todolist.id !== todolistId);
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
      });
  }

  return {
    todolists: readonly(todolists),
    loading: readonly(loading),
    fetchTodolists,
    addTodolist,
    deleteTodolist,
    getTodolistById,
  };
});
