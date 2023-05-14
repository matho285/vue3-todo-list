<template>
  <div class="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white w-1/4 rounded shadow px-4 py-4">
      <h2 class="text-lg font-bold mb-4"><slot name="title" /></h2>
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
