<template>
  <li class="todo-item">
    <div class="flex min-w-0">
      <n-checkbox v-model:checked="completed" />
      <span class="description" :class="{ completed }">
        {{ props.description }}
      </span>
    </div>
    <div class="flex">
      <n-button quaternary size="small" type="error" @click="onDeleteClick">
        Delete
      </n-button>
      <n-button quaternary size="small" type="info" @click="onEditClick">
        Edit
      </n-button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Task } from '@/interfaces'
import { computed } from 'vue'

const props = defineProps<Task>()

const emit = defineEmits<{
  deleteTask: [id: number]
  editTask: [id: number]
  updateTask: [task: Partial<Task>]
}>()

const completed = computed({
  get: () => props.completed,
  set: (completed) => {
    emit('updateTask', {
      id: props.id,
      completed
    })
  }
})

const onDeleteClick = () => {
  emit('deleteTask', props.id)
}
const onEditClick = () => {
  emit('editTask', props.id)
}
</script>

<style lang="scss" scoped>
.todo-item {
  @apply flex justify-between items-center;

  .description {
    @apply ml-2;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
