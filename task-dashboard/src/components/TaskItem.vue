<template>
  <li :class="{ completed: task.isCompleted }">
    <div class="task-content" @click="taskStore.toggleTask(task.id)">
      <div class="checkbox"></div>
      <span class="task-title">{{ task.title }}</span>
    </div>
    <button @click="taskStore.deleteTask(task.id)" class="delete-btn">
      Delete
    </button>
  </li>
</template>

<script>
import { useTaskStore } from '../stores/taskStore' 

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  }
}
</script>

<style scoped>
li {
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
li:hover {
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
li.completed {
  background-color: #f8fafc;
}
li.completed .checkbox {
  background-color: #42b883;
  border-color: #42b883;
}
li.completed .task-title {
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
</style>