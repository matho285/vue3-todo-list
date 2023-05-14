<template>
  <div
    class="bg-white shadow rounded px-4 py-2 mb-4"
    :class="{ 'border-2 border-red-400': missedDeadline }"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold" :class="{ 'line-through': todo.completed }">
        #{{ todo.id }} - {{ todo.title }}
      </h3>
      <div
        v-if="!todo.completed"
        class="cursor-pointer"
        @click.stop="deleteTodo(todolistId, todo.id)"
      >
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
    <p v-if="todo.deadline" class="text-gray-600 py-1" :class="{ 'line-through': todo.completed }">
      {{ formatDate(todo.deadline) }}
      <span v-if="missedDeadline" class="text-red-600">Missed deadline!</span>
    </p>
    <p class="text-gray-600 py-1" :class="{ 'line-through': todo.completed }">{{ todo.text }}</p>

    <button
      v-if="!todo.completed"
      class="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded"
      @click="markAsCompleted(todolistId, todo.id)"
    >
      Complete
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '@/types';
import { useTodosStore } from '@/stores/todos';
import { formatDate } from '@/utils/dateUtils';
import { computed } from 'vue';

const props = defineProps<{
  todolistId: string;
  todo: TodoItem;
}>();

const { deleteTodo, markAsCompleted } = useTodosStore();

const missedDeadline = computed(() => {
  const { deadline, completed } = props.todo;

  return !completed && deadline && new Date(deadline) < new Date();
});
</script>
