<template>
  <div class="container mx-auto px-4 py-6 flex-1 flex">
    <template v-if="currentTodolist">
      <div class="w-1/3 mr-4">
        <h2 class="text-2xl font-bold mb-4">
          Todolist: <span class="font-medium">{{ currentTodolist.title }}</span>
        </h2>

        <router-link :to="{ name: 'home' }">Back</router-link>
      </div>
      <div class="w-2/3">
        <Todos :todolist="currentTodolist"></Todos>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTodolistStore } from '@/stores/todolists';
import Todos from '@/components/Todos.vue';
import { computed } from 'vue';

const route = useRoute();
const { id } = route.params;

const todolistStore = useTodolistStore();
const { getTodolistById, fetchTodolists } = todolistStore;

const currentTodolist = computed(() => {
  return getTodolistById(id as string);
});

fetchTodolists();
</script>
