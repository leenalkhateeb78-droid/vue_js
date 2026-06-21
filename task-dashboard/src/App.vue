<template>
  <div class="app-container">
    <header>
      <h1>Task Tracker Dashboard</h1>
    </header>

    <div class="stats-container">
      <div class="stat-card total">
        <span class="stat-label">Total Tasks</span>
        <strong class="stat-value">{{ taskStore.totalCount }}</strong>
      </div>
      <div class="stat-card completed">
        <span class="stat-label">Completed</span>
        <strong class="stat-value">{{ taskStore.completedCount }}</strong>
      </div>
    </div>

    <TaskForm />

    <div v-if="taskStore.loading" class="loading">Loading tasks...</div>

    <ul v-else class="task-list">
      <TaskItem 
        v-for="task in taskStore.tasks" 
        :key="task.id" 
        :task="task" 
      />
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useTaskStore } from './stores/taskStore' 
import TaskForm from './components/TaskForm.vue'   
import TaskItem from './components/TaskItem.vue'  
export default {
  name: 'App',
  components: {
    TaskForm,
    TaskItem
  },
  setup() {
    const taskStore = useTaskStore()

    onMounted(() => {
      taskStore.fetchTasks()
    })

    return {
      taskStore
    }
  }
}
</script>

<style scoped>
.app-container {
  max-width: 650px;
  margin: 50px auto;
  padding: 30px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  direction: ltr;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  color: #2c3e50;
}
header {
  text-align: center;
  margin-bottom: 30px;
}
header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}
.stats-container {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}
.stat-card {
  flex: 1;
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background: #f7fafc;
  border: 1px solid #edf2f7;
}
.stat-card.total {
  border-left: 4px solid #49709c;
}
.stat-card.completed {
  border-left: 4px solid #42b883;
}
.stat-label {
  font-size: 0.85rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-value {
  font-size: 1.5rem;
  color: #2d3748;
  margin-top: 5px;
}
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.loading {
  text-align: center;
  color: #718096;
  padding: 20px;
}
</style>