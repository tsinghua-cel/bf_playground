<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Play Test Detail</h1>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Strategy Reorg Analysis</h2>
      <List :columns="list1Columns" :items="list1Items" />
      <Pagination
          :current-page="currentPage1"
          :total-pages="totalPages1"
          :items-per-page="itemsPerPage"
          :total-items="totalItems1"
          @prev="prevPage1"
          @next="nextPage1"
      />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Honest Lost Rate Analysis</h2>
      <List :columns="list2Columns" :items="list2Items" />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Comprehensive Lost Ratio Analysis</h2>
      <List :columns="list3Columns" :items="list3Items" />
    </div>

    <button @click="handleDownload" :disabled="loading" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      <span v-if="loading">Downloading...</span>
      <span v-else>Download</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import List from '../components/List.vue'
import Pagination from '../components/Pagination.vue'
import { getProjectDetail, downloadProject } from '../services/api'

const route = useRoute()

const list1Columns = ['ID', 'Name', 'Email', 'Status']
const list2Columns = ['ID', 'Product', 'Price', 'Stock']
const list3Columns = ['ID', 'Category', 'Supplier', 'Rating']

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

const getDetail = async() => {
  var response = await getProjectDetail(route.params.id)
  projectDetail = response.data
  await getStat()
  await loadList1()
  await loadList2()
  await loadList3()
}

const getStat = async() => {
  statItems = projectDetail.stat
}

const loadList1 = async () => {
  list1Items.value = projectDetail.strategies_with_reorg_count
  totalItems1.value = response.totalItems
  totalPages1.value = Math.ceil(response.totalItems / itemsPerPage)
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