<template>
  <div class="p-6 grid grid-cols-1 gap-4">
    <div
      v-for="(data, index) in allData"
      :key="index"
      class="bg-white shadow overflow-hidden rounded-lg p-6 space-y-4"
    >
      <div class="font-bold text-lg">WBS: {{ data.relatedSheet1.WBS }}</div>
      <div>ชื่องาน: {{ data.relatedSheet1.AssetDescription }}</div>
      <div>สถานะงาน: {{ data.relatedSheet1.UserStatus }}</div>
      <div>
        <div class="font-medium text-md">อุปกรณ์หลัก:</div>
        <ul>
          <li v-for="(item, idx) in data.relatedSheet2" :key="idx">
            {{ item.TenDigitCode }} - {{ item.EquipmentName }} ({{
              item.Required
            }})
          </li>
        </ul>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 mt-4">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                โครงข่าย
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                แผนก
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าแรงตามประมาณการ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าแรงคงเหลือ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าควบคุมตามประมาณการ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าควบคุมคงเหลือ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าขนส่งตามประมาณการ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าขนส่งคงเหลือ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                เบ็ดเตล็ดตามประมาณการ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                เบ็ดเตล็ดคงเหลือ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าดำเนินการตามประมาณการ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                ค่าดำเนินการคงเหลือ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(entry, subIndex) in data.relatedSheet3"
              :key="'sub-' + subIndex"
              class="border-b border-gray-200"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ entry.Network }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ entry.Description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  entry.PlanLaborCost.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                {{
                  (entry.PlanLaborCost - entry.ActLaborCost).toLocaleString(
                    "th-TH",
                    {
                      style: "currency",
                      currency: "THB",
                    }
                  )
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  entry.PlanSupervisionCost.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                {{
                  (
                    entry.PlanSupervisionCost - entry.ActSupervisionCost
                  ).toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  entry.PlanTransportCost.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                {{
                  (
                    entry.PlanTransportCost - entry.ActTransportCost
                  ).toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  entry.PlanMiscellaneousCost.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                {{
                  (
                    entry.PlanMiscellaneousCost - entry.ActMiscellaneousCost
                  ).toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  entry.PlanOperationCost.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                {{
                  (
                    entry.PlanOperationCost - entry.ActOperationCost
                  ).toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const allData = ref([]);

const apiUrl =
  "https://script.google.com/macros/s/AKfycbz9A82aAicpqjz-rKeBPGd7d_5WE5-09j4W2b51yI88uGHFEgUptj5C6a91g9bSxkdj2g/exec";

const fetchData = async () => {
  try {
    const [sheet1, sheet2, sheet3] = await Promise.all([
      axios.get(`${apiUrl}?sheetName=Sheet1`),
      axios.get(`${apiUrl}?sheetName=Sheet2`),
      axios.get(`${apiUrl}?sheetName=Sheet3`),
    ]);

    const combinedData = combineData(
      sheet1.data.data,
      sheet2.data.data,
      sheet3.data.data
    );
    allData.value = combinedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const combineData = (data1, data2, data3) => {
  return data1.slice(1).map((row) => {
    const relatedSheet1 = mapSheet1(row);
    const relatedSheet2 = data2
      .slice(1)
      .filter((r) => r[0] === row[4])
      .map(mapSheet2);
    const relatedSheet3 = data3
      .slice(1)
      .filter((r) => r[0] === row[4])
      .map(mapSheet3);
    return { relatedSheet1, relatedSheet2, relatedSheet3 };
  });
};

const mapSheet1 = (row) => ({
  WBS: row[4],
  AssetDescription: row[5],
  UserStatus: row[7],
});

const mapSheet2 = (row) => ({
  TenDigitCode: row[2],
  EquipmentName: row[3],
  Required: row[4],
});

const mapSheet3 = (row) => ({
  Network: row[1],
  Description: row[2],
  PlanMaterialCost: row[6],
  PlanMaterialInWorkCost: row[7],
  PlanLaborCost: row[8],
  PlanSupervisionCost: row[9],
  PlanTransportCost: row[10],
  PlanMiscellaneousCost: row[11],
  PlanOperationCost: row[12],
  ActMaterialCost: row[20],
  ActMaterialInWorkCost: row[21],
  ActLaborCost: row[22],
  ActSupervisionCost: row[23],
  ActTransportCost: row[24],
  ActMiscellaneousCost: row[25],
  ActOperationCost: row[26],
});

onMounted(fetchData);
</script>
