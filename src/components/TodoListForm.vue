<template>
  <FormModal>
    <template #title>Add new todolist</template>
    <template #form>
      <Form @submit="addNewTodolist">
        <div class="mb-2">
          <label class="block text-gray-700 font-bold mb-2" for="list-title"> Title </label>
          <Field
            v-model="title"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="list-title"
            name="list-title"
            type="text"
            rules="required"
          />
          <ErrorMessage name="list-title" />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            @click="$emit('closeModal')"
          >
            Cancel
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add todolist
          </button>
        </div>
      </Form>
    </template>
  </FormModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ErrorMessage, Form, Field } from 'vee-validate';
import { useTodolistStore } from '@/stores/todolists';
import FormModal from '@/components/FormModal.vue';

const emit = defineEmits<{
  (event: 'todolistAdded'): void;
  (event: 'closeModal'): void;
}>();

const title = ref('');

const { addTodolist } = useTodolistStore();
function addNewTodolist() {
  if (title.value) {
    const newTodolist = { title: title.value };
    addTodolist(newTodolist);
    emit('todolistAdded');
  }
}
</script>
