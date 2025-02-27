<template>
  <div>
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Evaluation results</h2>
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
      <h2 class="text-2xl font-semibold mb-4">Best strategies in all instances</h2>
      <p></p>
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

    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-icon"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopStrategyList  from "../components/TopStrategyList.vue";
import ProjectList from '../components/ProjectList.vue'
import Pagination from '../components/Pagination.vue'
import { getProjectList , getTopStrategies } from '../services/api'

const router = useRouter()

const list1Columns = ['Instance ID', 'Strategy Count', 'Start Time', 'End Time']
const list2Columns = [ 'Strategy Content', 'Lost Ratio of Honest Validator (L1)', 'Lost Ratio of Malicious Validator (L2)', 'Ratio (L1/L2)', 'Project ID']

const list1Items = ref([])
const list2Items = ref([])

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const totalPages1 = ref(1)
const totalPages2 = ref(1)
const itemsPerPage = 4
const totalItems1 = ref(0)
const totalItems2 = ref(0)
const isLoading = ref(false)

const loadList1 = async () => {
  isLoading.value = true
  const response = await getProjectList(currentPage1.value, itemsPerPage)
  list1Items.value = response.data
  totalItems1.value = response.total
  totalPages1.value = Math.ceil(response.total / itemsPerPage)
  isLoading.value = false
}

const loadList2 = async () => {
  isLoading.value = true
  const response = await getTopStrategies(currentPage2.value, itemsPerPage)
  list2Items.value = response.data
  totalItems2.value = response.total
  totalPages2.value = Math.ceil(response.total / itemsPerPage)
  isLoading.value = false
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

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Darker background for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-icon {
  border: 8px solid rgba(255, 255, 255, 0.3); /* Lighter border */
  border-top: 8px solid #ffffff; /* White color for the top border */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite; /* Faster spin */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>