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

    <form @submit.prevent="handleSubmit" class="task-form">
      <input 
        v-model="newTaskTitle" 
        type="text" 
        placeholder="Add a new task..." 
        required
      />
      <button type="submit">Add Task</button>
    </form>

    <div v-if="taskStore.loading" class="loading">Loading tasks...</div>

    <ul v-else class="task-list">
      <li 
        v-for="task in taskStore.tasks" 
        :key="task.id" 
        :class="{ completed: task.isCompleted }"
      >
        <div class="task-content" @click="taskStore.toggleTask(task.id)">
          <div class="checkbox"></div>
          <span class="task-title">{{ task.title }}</span>
        </div>
        <button @click="taskStore.deleteTask(task.id)" class="delete-btn">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTaskStore } from './stores/taskStore'

export default {
  name: 'App',
  setup() {
    const taskStore = useTaskStore()
    const newTaskTitle = ref('')

    onMounted(() => {
      taskStore.fetchTasks()
    })

    const handleSubmit = () => {
      if (newTaskTitle.value.trim() !== '') {
        taskStore.addTask(newTaskTitle.value.trim())
        newTaskTitle.value = ''
      }
    }

    return {
      taskStore,
      newTaskTitle,
      handleSubmit
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

.task-form {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.task-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.task-form input:focus {
  outline: none;
  border-color: #42b883;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.task-form button {
  padding: 12px 24px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.task-form button:hover {
  background-color: #33a06f;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid #edf2f7;
  transition: all 0.2s ease;
}

.task-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.task-title {
  font-size: 1rem;
  color: #4a5568;
  transition: all 0.2s ease;
}

.task-list li.completed {
  background-color: #f8fafc;
}

.task-list li.completed .checkbox {
  background-color: #42b883;
  border-color: #42b883;
}

.task-list li.completed .task-title {
  text-decoration: line-through;
  color: #a0aec0;
}

.delete-btn {
  background-color: #fff;
  color: #e53e3e;
  border: 1px solid #fed7d7;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background-color: #fff5f5;
  border-color: #e53e3e;
}

.loading {
  text-align: center;
  color: #718096;
  padding: 20px;
}
</style>