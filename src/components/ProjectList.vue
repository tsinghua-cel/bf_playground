<template>
  <table class="styled-table">
    <thead>
    <tr>
      <th v-for="column in columns" :key="column" :style="getColumnStyle(column)" class="center-align">{{ column }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item.project_id">
      <td :style="getColumnStyle('Project ID')" class="center-align clickable" @click="handleProjectIdClick(item.project_id)">{{ item.project_id }}</td>
      <td :style="getColumnStyle('Category')" class="center-align">{{ item.category }}</td>
      <td :style="getColumnStyle('Strategy Count')" class="center-align">{{ item.total_strategy }}</td>
      <td :style="getColumnStyle('Start Time')" class="center-align">{{ new Date(item.start_time * 1000).toLocaleString() }}</td>
      <td :style="getColumnStyle('End Time')" class="center-align">{{ new Date(item.end_time * 1000).toLocaleString() }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  columns: Array,
  items: Array
})

const router = useRouter()

const getColumnStyle = (column) => {
  switch (column) {
    case 'Project ID':
      return { width: '350px' }
    case 'Category':
      return { width: '150px' }
    case 'Strategy Count':
      return { width: '140px' }
    case 'Start Time':
      return { width: '300px' }
    case 'End Time':
      return { width: '300px' }
    default:
      return {}
  }
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
</style>