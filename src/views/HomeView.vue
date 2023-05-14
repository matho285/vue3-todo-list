<template>
  <div class="container mx-auto px-4 py-6 flex-1 flex">
    <div class="w-1/3 mr-4">
      <h2 class="text-2xl font-bold mb-4">My todolists</h2>

      <TodoList
        v-for="todolist in todolists"
        :key="todolist.id"
        :todolist="todolist"
        @delete="deleteTodolist(todolist.id)"
        @click.stop="selectedTodolist = todolist"
      />

      <button
        v-if="!showTodolistForm"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        @click.stop="showTodolistForm = true"
      >
        Add List
      </button>

      <TodoListForm
        v-if="showTodolistForm"
        @todolist-added="showTodolistForm = false"
        @close-modal="showTodolistForm = false"
      />
    </div>
    <div class="w-2/3">
      <Todos v-if="selectedTodolist" :todolist="selectedTodolist"></Todos>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoList from '@/components/TodoList.vue';
import { storeToRefs } from 'pinia';
import { useTodolistStore } from '@/stores/todolists';
import type { Todolist } from '@/types';
import Todos from '@/components/Todos.vue';
import TodoListForm from '@/components/TodoListForm.vue';

const showTodolistForm = ref(false);

const todolistStore = useTodolistStore();
const { todolists } = storeToRefs(todolistStore);
const { fetchTodolists, deleteTodolist } = todolistStore;

const selectedTodolist = ref<Todolist | undefined>();

onMounted(() => {
  fetchTodolists();
});
</script>
