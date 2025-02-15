<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">BunnyFinder Playground</h1>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Play History</h2>
      <ProjectList :columns="list1Columns" :items="list1Items" />
      <Pagination
          :current-page="currentPage1"
          :total-pages="totalPages1"
          :items-per-page="itemsPerPage"
          :total-items="totalItems1"
          @prev="prevPage1"
          @next="nextPage1"
      />
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">Comprehensive Lost Ratio Analysis</h2>
      <TopStrategyList :columns="list2Columns" :items="list2Items" />
      <Pagination
          :current-page="currentPage2"
          :total-pages="totalPages2"
          :items-per-page="itemsPerPage"
          :total-items="totalItems2"
          @prev="prevPage2"
          @next="nextPage2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import List from '../components/List.vue'
import TopStrategyList  from "../components/TopStrategyList.vue";
import ProjectList from '../components/ProjectList.vue'
import Pagination from '../components/Pagination.vue'
import { getProjectList , getTopStrategies } from '../services/api'

const router = useRouter()

const list1Columns = ['Project ID', 'Total Slot', 'Start Time', 'End Time']
const list2Columns = ['Strategy ID', 'Honest Lose', 'Malicious Lose', 'Ratio', 'Project ID', 'Strategy Content']

const list1Items = ref([])
const list2Items = ref([])

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const totalPages1 = ref(1)
const totalPages2 = ref(1)
const itemsPerPage = 5
const totalItems1 = ref(0)
const totalItems2 = ref(0)

const loadList1 = async () => {
  const response = await getProjectList(currentPage1.value, itemsPerPage)
  list1Items.value = response.data
  console.log("home project list response", response.data)
  totalItems1.value = response.total
  totalPages1.value = Math.ceil(response.total / itemsPerPage)
}

const loadList2 = async () => {
  const response = await getTopStrategies(currentPage2.value, itemsPerPage)
  list2Items.value = response.data
  console.log("home top strategy list response", response.data)
  totalItems2.value = response.total
  totalPages2.value = Math.ceil(response.total / itemsPerPage)
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


const prevPage2 = () => {
  if (currentPage2.value > 1) {
    currentPage2.value--
    loadList2()
  }
}

const nextPage2 = () => {
  if (currentPage2.value < totalPages2.value) {
    currentPage2.value++
    loadList2()
  }
}

onMounted(() => {
  loadList1()
  loadList2()
})

</script>