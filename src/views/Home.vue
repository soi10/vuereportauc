<template>
  <div class="container mx-auto px-4 py-5">
    <h1 class="text-4xl text-center mb-10">Welcome to Our Vue App</h1>
    <div v-if="loading" class="text-center">Loading data...</div>
    <div v-if="error" class="text-red-500 text-center">
      Error loading data: {{ error }}
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-200">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-4 py-2"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="border px-4 py-2"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const data = ref([]);
const headers = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbz9A82aAicpqjz-rKeBPGd7d_5WE5-09j4W2b51yI88uGHFEgUptj5C6a91g9bSxkdj2g/exec?sheetName=Sheet1"
    );
    headers.value = response.data.data[0]; // Set headers from the first row
    data.value = response.data.data.slice(1); // Set data removing the first row
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Styles specific to this component */
</style>
