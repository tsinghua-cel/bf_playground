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
        <td class="center-align">
          <span>{{ item.strategy_content.slice(0,100) }}...</span>
          <button @click="showModal(item.strategy_content)" class="view-button">View All</button>
        </td>
<!--        <td class="center-align">{{ item.strategy_id }}</td>-->
        <td class="center-align">{{ item.honest_lose }}</td>
        <td class="center-align">{{ item.malicious_lose }}</td>
        <td class="center-align">{{ item.ratio }}</td>
        <td class="center-align clickable" @click="handleProjectIdClick(item.project_id)">
          {{ item.project_id.slice(0,5) }}...{{ item.project_id.slice(-5,) }}
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
    default: () => ['Project ID', 'Honest Lose', 'Malicious Lose', 'Ratio', 'Strategy ID', 'Strategy Content']
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
  background-color: #2575fc; /* Blue background for the title */
  color: #ffffff; /* White text for the title */
  text-align: center;
  font-weight: bold;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  background-color: #ffffff;
  color: #000000;
  border-bottom: 1px solid #dddddd;
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #2575fc;
}
.center-align {
  text-align: center;
}
.clickable {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.view-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
  font-size: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.view-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>