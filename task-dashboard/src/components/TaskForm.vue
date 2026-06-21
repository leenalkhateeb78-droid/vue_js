<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input 
      v-model="newTaskTitle" 
      type="text" 
      placeholder="Add a new task..." 
      required
    />
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore' 

export default {
  name: 'TaskForm',
  setup() {
    const taskStore = useTaskStore()
    const newTaskTitle = ref('')

    const handleSubmit = () => {
      if (newTaskTitle.value.trim() !== '') {
        taskStore.addTask(newTaskTitle.value.trim())
        newTaskTitle.value = ''
      }
    }

    return {
      newTaskTitle,
      handleSubmit
    }
  }
}
</script>

<style scoped>
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
</style>