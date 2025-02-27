<template>
  <div>
    <div class="mb-12">
      <Dash :stat="statItems"/>
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Result with reorganizations</h2>
      <ReorgStrategyList :columns="list1Columns" :items="list1Items" />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Result with lost rate</h2>
      <HonestStrategyList :columns="list2Columns" :items="list2Items" />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Result with best lost ratio</h2>
      <RatioStrategyList :columns="list3Columns" :items="list3Items" />
    </div>

    <button @click="handleDownload" :disabled="loading" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      <span v-if="loading">Downloading...</span>
      <span v-else>Download</span>
    </button>

    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-icon"></div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import Pagination from '../components/Pagination.vue'
import Dash from '../components/Dash.vue'
import {getProjectDetail, downloadProject} from '../services/api'
import ReorgStrategyList from "../components/ReorgStrategyList.vue";
import HonestStrategyList from "../components/HonestStrategyList.vue";
import RatioStrategyList from "../components/RatioStrategyList.vue";

const route = useRoute()

const list1Columns = ['Strategy Content', 'Reorg Count']
const list2Columns = ['Strategy Content', 'Honest Lost Rate']
const list3Columns = ['Strategy Content', 'Lost Ratio of Honest Validator (L1)', 'Lost Ratio of Malicious Validator (L2)', 'Ratio (L1/L2)']

let statItems = ref({})
const list1Items = ref([])
const list2Items = ref([])
const list3Items = ref([])

const currentPage1 = ref(1)
const totalPages1 = ref(1)
const itemsPerPage = 15
const totalItems1 = ref(0)

let projectDetail = ref({})
const loading = ref(false)
const isLoading = ref(false)

const getDetail = async () => {
  isLoading.value = true
  var response = await getProjectDetail(route.params.id)
  projectDetail = response.data
  await getStat()
  await loadList1()
  await loadList2()
  await loadList3()
  isLoading.value = false
}

const getStat = async () => {
  statItems = projectDetail.stat
}

const loadList1 = async () => {
  list1Items.value = projectDetail.strategies_with_reorg_count
}

const loadList2 = async () => {
  list2Items.value = projectDetail.strategies_with_honest_lose
}

const loadList3 = async () => {
  list3Items.value = projectDetail.strategies_with_great_honest_lose
}

const prevPage1 = () => {
  if (currentPage1.value > 1) {
    currentPage1.value--
    loadList1()
  }
}

const nextPage1 = () => {
  if (currentPage1.value < totalPages1.value) {
    currentPage1.value++
    loadList1()
  }
}

const handleDownload = async () => {
  if (loading.value) return
  loading.value = true
  try {
    await downloadProject(route.params.id)
  } catch (error) {
    console.error('Download failed:', error)
    alert('Download failed. Please try again.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDetail()
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-icon {
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #ffffff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>