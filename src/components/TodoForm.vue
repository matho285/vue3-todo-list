<template>
  <FormModal>
    <template #title>Add new todo</template>
    <template #form>
      <Form @submit="addNewTodo">
        <div class="mb-2">
          <label class="block text-gray-700 font-bold mb-2" for="list-title"> Title </label>
          <Field
            v-model="todo.title"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="todo-title"
            name="todo-title"
            type="text"
            rules="required"
          />
          <ErrorMessage name="todo-title" />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 font-bold mb-2" for="list-title"> Todo text </label>
          <Field
            v-model="todo.text"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="todo-text"
            name="todo-text"
            type="text"
            rules="required"
          />
          <ErrorMessage name="todo-text" />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 font-bold mb-2" for="list-title"> Deadline </label>
          <Field
            v-model="todo.deadline"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="todo-deadline"
            name="todo-deadline"
            type="date"
          />
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
            Add todo
          </button>
        </div>
      </Form>
    </template>
  </FormModal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { ErrorMessage, Form, Field } from 'vee-validate';
import FormModal from '@/components/FormModal.vue';

const props = defineProps<{
  todolistId: string;
}>();

const emit = defineEmits<{
  (event: 'todoAdded'): void;
  (event: 'closeModal'): void;
}>();

let todo = reactive({
  title: '',
  text: '',
  deadline: '',
  completed: false,
  todolistId: props.todolistId,
});

const { addTodo } = useTodosStore();
function addNewTodo() {
  const newTodo = { ...todo };
  addTodo(props.todolistId, newTodo);
  emit('todoAdded');
}
</script>
