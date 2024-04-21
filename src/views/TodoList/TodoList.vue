<template>
  <div class="todo-list">
    <h1>Todo List</h1>

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
    <ul v-if="tasks.length" class="list">
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
import { onMounted, ref } from 'vue'
import { db } from '@/db'
import { Task } from '@/interfaces'
import EditTodoModal from './containers/EditTodoModal.vue'
import TodoItem from './containers/TodoItem.vue'

const newTask = ref('')
const tasks = ref<Task[]>([])

const getTasks = async () => {
  const dbTasks = (await db.tasks.toArray()) as Task[]
  tasks.value = dbTasks
  return tasks
}
onMounted(() => {
  getTasks()
})

const addTask = async () => {
  if (newTask.value.trim() !== '') {
    await db.tasks.add({ description: newTask.value, completed: false })
    newTask.value = ''
    await getTasks()
  }
}

const deleteTask = async (id: number) => {
  await db.tasks.delete(id)
  await getTasks()
}

const isModalShow = ref(false)
const editingTask = ref<Task | null>(null)
const editTask = async (id: number) => {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    editingTask.value = task
    /* c8 ignore next 3 */
  } else {
    editingTask.value = null
  }

  isModalShow.value = true
}

const updateTask = async (updatedTask: Partial<Task>) => {
  await db.tasks.update(updatedTask.id, updatedTask)
  await getTasks()
}
</script>

<style lang="scss" scoped>
.todo-list {
  @apply w-96 mx-auto mt-12 max-w-full;

  h1 {
    @apply text-3xl font-bold mb-5;
  }

  .list {
    @apply flex flex-col gap-2 mt-4 max-h-80 overflow-y-auto bg-gray-100 p-2 rounded-md;
  }
}
</style>
