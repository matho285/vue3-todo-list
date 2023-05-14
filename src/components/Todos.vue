<template>
  <div class="bg-white shadow rounded px-4 py-2 mb-4">
    <h2 class="text-lg font-bold mb-2">Todolist: {{ todolist.title }}</h2>

    <TodoFilter @filter-todos="filter = $event" />

    <ul>
      <li v-for="todo in currentTodos" :key="todolist.id + todo.id">
        <Todo :todo="todo" :todolist-id="todolist.id" />
      </li>
    </ul>

    <button
      v-if="!showTodoForm"
      class="bg-blue-500 text-white px-4 py-2 rounded"
      @click.stop="showTodoForm = true"
    >
      Add new todo
    </button>

    <TodoForm
      v-if="showTodoForm"
      :todolist-id="todolist.id"
      @todo-added="showTodoForm = false"
      @close-modal="showTodoForm = false"
    ></TodoForm>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTodosStore } from '@/stores/todos';
import type { FilterTodo, Todolist } from '@/types';
import Todo from '@/components/Todo.vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoFilter from '@/components/TodoFilter.vue';

const props = defineProps<{
  todolist: Todolist;
}>();

const showTodoForm = ref(false);

const todosStore = useTodosStore();
const { fetchTodos, getTodosByTodolistId } = todosStore;

const filter = ref<FilterTodo | undefined>();
const currentTodos = computed(() => {
  return getTodosByTodolistId(props.todolist.id, filter.value);
});

onMounted(() => {
  fetchTodos(props.todolist.id);
});
</script>
