<template>
  <div class="dashboard">
    <table class="table table-bordered table-hover">
      <thead class="thead-light">
      <tr>
        <th>Instance ID</th>
        <th>Slot Count</th>
        <th>Strategy Count</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ stat.project_id }}</td>
        <td>{{ stat.total_slot }}</td>
        <td>{{ stat.total_strategy }}</td>
        <td>{{ new Date(stat.start_time * 1000).toLocaleString() }}</td>
        <td>{{ new Date(stat.end_time * 1000).toLocaleString() }}</td>
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
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.table th, .table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.thead-light th {
  background-color: #f1f1f1;
  color: #333;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.table th {
  font-weight: 600;
}

.table td {
  color: #555;
}
</style>