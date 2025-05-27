<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h2>Пользователи</h2>
  <p v-if="isLoading">Загрузка...</p>
  <p v-if="error">Ошибка: {{ error }}</p>
  <ul v-if="!isLoading && !error">
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

import { ref, onMounted } from "vue";

interface User {
  id: number;
  name: string;
}

const users = ref<User[]>([]);
const isLoading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}`); // ← замени на свой URL
    if (!res.ok) throw new Error("Ошибка при загрузке");
    users.value = await res.json();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
