<template>
  <div class="dashboard">
    <table class="styled-table">
      <thead class="thead-light">
      <tr>
        <th>Instance ID</th>
        <th>Category</th>
        <th>Slot Count</th>
        <th>Strategy Count</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td  class="center-align">{{ stat.project_id }}</td>
        <td  class="center-align">{{ stat.category }}</td>
        <td  class="center-align">{{ stat.total_slot }}</td>
        <td  class="center-align">{{ stat.total_strategy }}</td>
        <td  class="center-align">{{ new Date(stat.start_time * 1000).toLocaleString() }}</td>
        <td  class="center-align">{{ new Date(stat.end_time * 1000).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => ['Strategy ID', 'Reorg Count', 'Strategy Content']
  },
  stat: ref({})
})

// const stat = ref({
//   project_id: 'e66825c9-21e4-4fba-b226-e08cf6e2de03',
//   total_slot: 29919,
//   total_strategy: 656,
//   start_time: 1739244259,
//   end_time: 1739604151
// })
</script>

<style scoped>
.dashboard {
  //padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
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
</style>