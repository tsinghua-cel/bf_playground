<template>
  <div>
    <table class="styled-table">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column" class="center-align">{{ column }}</th>
      </tr>
      </thead>
      <tbody class="scrollable-tbody">
      <tr v-for="item in items" :key="item.project_id">
        <td class="center-align">{{ item.strategy_id }}</td>
        <td class="center-align">{{ item.honest_lose_rate_avg }}</td>
        <td class="center-align">
            <span @click="showModal(item.strategy_content)">
              {{ item.strategy_content.slice(0, 20) }}...
            </span>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal :isVisible="isModalVisible" :content="modalContent" @close="isModalVisible = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useRouter } from 'vue-router'


const props = defineProps({
  columns: {
    type: Array,
    default: () => ['Strategy ID', 'Honest Lose',  'Strategy Content']
  },
  items: Array
})

const isModalVisible = ref(false)
const modalContent = ref('')
const router = useRouter()

const showModal = (content) => {
  modalContent.value = content
  isModalVisible.value = true
}

const handleProjectIdClick = (projectId) => {
  router.push({ name: 'Detail', params: { id: projectId } })
}
</script>

<style scoped>

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.center-align {
  text-align: center;
}
.clickable {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>