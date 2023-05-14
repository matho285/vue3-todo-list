<template>
  <div class="flex justify-between items-center py-4 border-b">
    <div class="flex items-center">
      <label for="text-filter" class="mr-4">Search by text:</label>
      <input
        v-model="filter.text"
        type="text"
        id="text-filter"
        class="border rounded py-2 px-4"
        @change="filterTodos"
      />
    </div>
    <div class="flex items-center">
      <label for="status-filter" class="mr-4">Filter by status:</label>
      <select
        v-model="filter.status"
        id="status-filter"
        class="border rounded py-2 px-4 w-full"
        @change="filterTodos"
      >
        <option v-for="option in statusOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { FilterStatus } from '@/types';
import type { FilterTodo } from '@/types';

const filter = reactive<FilterTodo>({
  text: '',
  status: FilterStatus.ALL,
});

const emit = defineEmits<{
  (event: 'filterTodos', filter: FilterTodo): void;
}>();

function filterTodos() {
  emit('filterTodos', filter);
}

const statusOptions = Object.keys(FilterStatus).map((status: string) => {
  return { label: capitalizeFirstLetter(status), value: status };
});
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
</script>
