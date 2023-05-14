import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { FilterTodo, TodoItem } from '@/types';
import { FilterStatus } from '@/types';
import todosService from '@/services/todosService';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Map<string, TodoItem[]>>(new Map());
  const loading = ref(false);
  const error = ref(null);
  function fetchTodos(todolistId: string) {
    todos.value.set(todolistId, []);

    loading.value = true;

    todosService
      .getTodos(todolistId)
      .then((loadedTodos: TodoItem[]) => {
        todos.value.set(todolistId, loadedTodos);
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        loading.value = false;
      });
  }

  function addTodo(todolistId: string, newTodo: Partial<TodoItem>) {
    todosService
      .addTodo(todolistId, newTodo)
      .then((createdTodo: TodoItem) => {
        todos.value.get(todolistId)!.push(createdTodo);
      })
      .catch((err) => {
        error.value = err;
      });
  }
  function markAsCompleted(todolistId: string, todoId: string) {
    todosService
      .updateTodo(todolistId, todoId, { completed: true })
      .then(() => {
        const todoItems = todos.value.get(todolistId)!;
        const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
        todoItems[todoIndex].completed = true;
      })
      .catch((err) => {
        error.value = err;
      });
  }

  function deleteTodo(todolistId: string, todoId: string) {
    todosService
      .deleteTodo(todolistId, todoId)
      .then(() => {
        const todoItems = todos.value.get(todolistId)!;
        todos.value.set(
          todolistId,
          todoItems.filter((todo) => todo.id !== todoId),
        );
      })
      .catch((err) => {
        error.value = err;
      });
  }
  function getTodosByTodolistId(todolistId: string, filter: FilterTodo | undefined = undefined) {
    let todoItems = todos.value.get(todolistId) || [];

    if (filter?.text) {
      todoItems = todoItems.filter((todoItem) => todoItem.title.includes(filter.text));
    }
    if (filter?.status) {
      if (filter.status === FilterStatus.COMPLETED) {
        todoItems = todoItems.filter((todoItem) => todoItem.completed);
      } else if (filter.status === FilterStatus.ACTIVE) {
        todoItems = todoItems.filter((todoItem) => !todoItem.completed);
      }
    }

    return todoItems;
  }

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    deleteTodo,
    markAsCompleted,
    getTodosByTodolistId,
  };
});
