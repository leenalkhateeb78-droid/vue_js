<template>
  <div class="app-container">
    <header>
      <h1>لوحة إدارة المهام</h1>
      <p>تطبيق SPA بسيط ومحترف يغطي متطلبات المادة</p>
    </header>

    <!-- قسم الإحصائيات (Getters المتوفرة في Pinia) -->
    <div class="stats-card">
      <div>إجمالي المهام: <strong>{{ taskStore.totalCount }}</strong></div>
      <div>المهام المكتملة: <strong>{{ taskStore.completedCount }}</strong></div>
    </div>

    <!-- نموذج إضافة مهمة جديدة -->
    <form @submit.prevent="handleSubmit" class="task-form">
      <input 
        v-model="newTaskTitle" 
        type="text" 
        placeholder="اكتب مهمة جديدة هنا..." 
        required
      />
      <button type="submit">إضافة</button>
    </form>

    <!-- مؤشر جاري التحميل عند استدعاء البيانات -->
    <div v-if="taskStore.loading" class="loading">جاري تحميل المهام...</div>

    <!-- قائمة عرض المهام -->
    <ul v-else class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" :class="{ completed: task.isCompleted }">
        <span @click="taskStore.toggleTask(task.id)">
          {{ task.title }}
        </span>
        <button @click="taskStore.deleteTask(task.id)" class="delete-btn">حذف</button>
      </li>
    </ul>
  </div>
</template>

<script>
// استيراد الميزات المطلوبة: Composition API و Lifecycle Hook
import { ref, onMounted } from 'vue'
import { useTaskStore } from './stores/taskStore'

export default {
  name: 'App',
  setup() {
    const taskStore = useTaskStore()
    const newTaskTitle = ref('') // استخدام ref لربط النص المكتوب

    // دالة Lifecycle Hook تعمل تلقائياً بمجرد تشغيل الصفحة وفور تركيب المكون لتجلب البيانات
    onMounted(() => {
      taskStore.fetchTasks()
    })

    // دالة التعامل مع الإرسال لإضافة المهمة
    const handleSubmit = () => {
      if (newTaskTitle.value.trim() !== '') {
        taskStore.addTask(newTaskTitle.value.trim())
        newTaskTitle.value = '' // تفريغ الخانة بعد الإضافة
      }
    }

    // إرجاع المتغيرات للـ template لتظهر على الشاشة
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
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: sans-serif;
  direction: rtl;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
header {
  text-align: center;
  margin-bottom: 20px;
}
.stats-card {
  display: flex;
  justify-content: space-between;
  background-color: #eef2f3;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.task-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.task-form button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.task-list {
  list-style: none;
  padding: 0;
}
.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  border-right: 5px solid #35495e;
}
.task-list li.completed {
  border-right-color: #42b883;
  text-decoration: line-through;
  opacity: 0.7;
}
.task-list li span {
  cursor: pointer;
  flex: 1;
}
.delete-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.loading {
  text-align: center;
  color: #666;
}
</style>