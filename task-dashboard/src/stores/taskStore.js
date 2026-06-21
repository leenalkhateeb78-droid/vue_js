import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false
  }),
  
  getters: {
    totalCount: (state) => state.tasks.length,
    completedCount: (state) => state.tasks.filter(t => t.isCompleted).length
  },
  
  actions: {
    fetchTasks() {
      this.loading = true
      const savedTasks = localStorage.getItem('my_tasks')
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks)
      } else {
        // نصوص افتراضية بالإنجليزية
        this.tasks = [
          { id: 1, title: 'Learn Vue 3 & SPA Fundamentals', isCompleted: true },
          { id: 2, title: 'Master Pinia State Management', isCompleted: false }
        ]
      }
      this.loading = false
    },
    
    addTask(title) {
      this.tasks.push({
        id: Date.now(),
        title: title,
        isCompleted: false
      })
      this.saveToLocalStorage()
    },
    
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },
    
    toggleTask(id) {
      this.tasks.forEach(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted
        }
      })
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('my_tasks', JSON.stringify(this.tasks))
    }
  }
})