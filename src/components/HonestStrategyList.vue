<template>
  <div>
    <div class="explanation">
      <img src="/assets/tip-icon.png" alt="Tip" class="tip-icon" />
      <span class="explanation-text">This table shows the strategy details along with the corresponding lost rates incurred by honest validators, sorted in descending order based on the lost rate.</span>
    </div>
    <table class="styled-table">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column" class="center-align">{{ column }}</th>
      </tr>
      </thead>
      <tbody class="scrollable-tbody">
      <tr v-for="item in items" :key="item.project_id">
        <td class="center-align">
            <span class="clickable" @click="showModal(item.strategy_content)">
              {{ item.strategy_content.slice(0, 100) }}...
            </span>
        </td>
<!--        <td class="center-align">{{ item.strategy_id }}</td>-->
        <td class="center-align">{{ item.honest_lose_rate_avg }}</td>

      </tr>
      </tbody>
    </table>
    <Modal :isVisible="isModalVisible" :content="modalContent" @close="isModalVisible = false" />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Modal from './Modal.vue'
import {useRouter} from 'vue-router'

const props = defineProps({
  columns: {
    type: Array,
    default: () => ['Strategy ID', 'Honest Lost Rate', 'Strategy Content']
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
  router.push({name: 'Detail', params: {id: projectId}})
}
</script>

<style scoped>
.explanation {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.tip-icon {
  margin-right: 10px;
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.explanation-text {
  font-size: 16px;
  color: #555;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
}

.styled-table thead tr {
  background-color: #2575fc;
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
</style>