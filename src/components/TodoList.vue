<template>
  <div class="bg-white shadow rounded px-4 py-2 mb-4 cursor-pointer">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold mb-2">{{ todolist.title }}</h3>
      <div @click.stop="$emit('delete')" class="cursor-pointer">
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>

    <p class="mt-2 text-sm text-slate-500">Todos count: {{ todosCount }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Todolist } from '@/types';
import { useTodosStore } from '@/stores/todos';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  todolist: Todolist;
}>();

defineEmits<{
  (event: 'delete'): void;
}>();

const todoStore = useTodosStore();
const { todos } = storeToRefs(todoStore);

const todosCount = computed(() => {
  return todos.value.get(props.todolist.id)?.length;
});

onMounted(async () => {
  todoStore.fetchTodos(props.todolist.id);
});
</script>
