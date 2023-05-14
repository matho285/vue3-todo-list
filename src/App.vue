<template>
  <!--  <main class="bg-gray-300 h-screen h-full">-->
  <!--    <RouterView />-->
  <!--  </main>-->
  <main class="bg-gray-100 min-h-screen flex flex-col">
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-2 flex items-center justify-between">
        <h1 class="text-xl font-bold">Todo App with Pinia and TailwindCSS</h1>
      </div>
    </div>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
