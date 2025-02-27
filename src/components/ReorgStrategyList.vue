<template>
  <div>
    <div class="explanation">
      <img src="/assets/tip-icon.png" alt="Tip" class="tip-icon" />
      <span class="explanation-text">This table shows the strategy details along with the corresponding number of chain reorganizations (reorgs) it induced, sorted in descending order based on the reorg count.</span>
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
        <td class="center-align">{{ item.reorg_count }}</td>

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
    default: () => ['Strategy Content', 'Reorg Count']
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
  width: 20px; /* Set the desired width */
  height: 20px; /* Set the desired height */
  font-size: 20px;
}


.tip-icon {
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