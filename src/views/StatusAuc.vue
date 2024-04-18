<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl text-center mb-6">Asset Status Summary</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WBS
            </th>
            <th v-for="status in statuses" :key="status"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ status }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(counts, description, wbsCode) in groupedData" :key="description">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ description }}
            </td>
            <td v-for="status in statuses" :key="status"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
              @click="showModal(description, status)">
              {{ counts.statusCounts[status] || 0 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ counts.total }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click.self="closeModal">
    <div class="relative top-1/4 mx-auto p-5 border w-auto shadow-lg rounded-md bg-white" style="max-width: 90%">
      <div class="mt-3 text-center">
        <div class="mt-4 text-left">
          <!-- Iterate through descriptions and prepend the WBS to each -->
          <p v-for="desc in currentDescriptions" :key="desc" class="py-2">
            {{ desc }}
          </p>
        </div>
        <span class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
          @click="closeModal">
          Close
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const apiUrl =
  "https://script.google.com/macros/s/AKfycbz9A82aAicpqjz-rKeBPGd7d_5WE5-09j4W2b51yI88uGHFEgUptj5C6a91g9bSxkdj2g/exec?sheetName=Sheet1";
const data = ref([]);
const groupedData = ref({});
const loading = ref(false);
const error = ref(null);
const statuses = ["A0", "B2", "C1", "C3", "C9", "D1", "D2", "E2", "F2", "F4"];
const isModalVisible = ref(false);
const currentDescriptions = ref([]);
const currentWBSDescription = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(apiUrl);
    data.value = response.data.data.slice(1); // Skip header row
    processGroupedData();
  } catch (e) {
    error.value = `Failed to fetch data: ${e.message}`;
  } finally {
    loading.value = false;
  }
});

function processGroupedData() {
  const map = {};
  data.value.forEach((row) => {
    const wbsCode = row[4];
    const descriptionKey = wbsCode.substring(0, 12);
    const fullDescription = row[5];
    const status = row[7];
    const combinedDescription = `${wbsCode} - ${fullDescription}`; // Combine WBS code and description

    if (!map[descriptionKey]) {
      map[descriptionKey] = { descriptions: {}, total: 0, statusCounts: {} };
      statuses.forEach((status) => {
        map[descriptionKey].statusCounts[status] = 0;
        map[descriptionKey].descriptions[status] = new Set();  // Set to hold combined descriptions
      });
    }

    map[descriptionKey].descriptions[status].add(combinedDescription);
    map[descriptionKey].statusCounts[status]++;
    map[descriptionKey].total++;
  });

  Object.keys(map).forEach((key) => {
    statuses.forEach((status) => {
      map[key].descriptions[status] = Array.from(map[key].descriptions[status]);
    });
  });

  groupedData.value = map;
}



function showModal(description, status) {
  currentDescriptions.value = groupedData.value[description].descriptions[status];
  isModalVisible.value = true;
}



function closeModal() {
  isModalVisible.value = false;
}
</script>

<style scoped>
/* Add custom styles here */
</style>