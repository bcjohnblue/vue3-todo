<template>
  <div class="todo-list">
    <h1>Todo App</h1>

    <!-- Input form to add tasks -->
    <div class="flex items-center">
      <n-input
        v-model:value="newTask"
        type="text"
        placeholder="Add a new task"
        @keydown.enter="addTask"
      />
      <n-button type="primary" class="ml-2" @click="addTask"> Add </n-button>
    </div>

    <!-- List of tasks -->
    <ul class="list">
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        v-bind="task"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @updateTask="updateTask"
      />
    </ul>
  </div>

  <EditTodoModal
    v-bind="editingTask"
    v-model:isModalShow="isModalShow"
    @updateTask="updateTask"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Task } from '../../interfaces'
import { uuidv4 } from '../../utils'
import EditTodoModal from './containers/EditTodoModal.vue'
import TodoItem from './containers/TodoItem.vue'

const newTask = ref('')
const tasks = reactive<Task[]>([
  { id: '1', description: 'Task 1', completed: false },
  { id: '2', description: 'Task 2', completed: true },
  { id: '3', description: 'Task 3', completed: false }
])

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.push({ id: uuidv4(), description: newTask.value, completed: false })
    newTask.value = ''
  }
}

const deleteTask = (id: string) => {
  const deletedIndex = tasks.findIndex((task) => {
    return task.id === id
  })
  if (deletedIndex > -1) {
    tasks.splice(deletedIndex, 1)
  }
}

const isModalShow = ref(false)
const editingTask = ref<Task | null>(null)

const editTask = (id: string) => {
  const target = tasks.find((task) => {
    return task.id === id
  })
  editingTask.value = target || null
  isModalShow.value = true
}

const updateTask = (updatedTask: Partial<Task>) => {
  const updatedIndex = tasks.findIndex((task) => {
    return task.id === updatedTask.id
  })

  tasks[updatedIndex] = { ...tasks[updatedIndex], ...updatedTask }
}
</script>

<style lang="scss" scoped>
.todo-list {
  @apply w-96 mx-auto mt-20;

  h1 {
    @apply text-3xl font-bold mb-5;
  }

  .list {
    @apply flex flex-col gap-2 mt-4 max-h-80 overflow-y-auto bg-gray-100 p-2 rounded-md;
  }
}
</style>
