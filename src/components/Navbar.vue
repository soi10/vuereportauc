<template>
  <div class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo Section -->
      <div>
        <router-link to="/" class="text-xl font-bold">LOGO</router-link>
      </div>

      <!-- Menu Section -->
      <div class="flex space-x-4">
        <router-link
          v-for="item in menuItems"
          :key="item.text"
          :to="item.href"
          class="hover:text-gray-300"
        >
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuItems = ref([
  { text: "Home", href: "/" },
  { text: "Status", href: "/statusauc" },
]);
</script>
