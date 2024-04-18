<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
/* เพิ่มสไตล์ทั่วไปหรือโกลบอลสไตล์ที่นี่ */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #f4f4f4;
}
</style>
