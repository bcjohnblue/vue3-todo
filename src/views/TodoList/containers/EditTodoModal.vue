<template>
  <n-modal v-model:show="isModalShow" preset="card" :style="style">
    <template #header>
      <div>Edit task</div>
    </template>
    <n-input
      v-model:value="description"
      type="text"
      placeholder="Update the task"
    />
    <template #action>
      <div class="flex justify-end gap-2">
        <n-button @click="onCancelClick"> Cancel </n-button>
        <n-button type="primary" @click="onUpdateClick"> Update </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { Task } from '@/interfaces'
import { computed, ref, watch } from 'vue'

interface Props extends Partial<Task> {
  isModalShow: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  updateTask: [task: Partial<Task>]
  'update:isModalShow': [boolean]
}>()

const style = computed(() => {
  return {
    width: '400px',
    height: '200px'
  }
})

const isModalShow = computed({
  get: () => props.isModalShow,
  set: (isModalShow) => {
    emit('update:isModalShow', isModalShow)
  }
})

const description = ref(props.description)
watch(isModalShow, (isModalShow) => {
  if (isModalShow) {
    description.value = props.description
  } else {
    description.value = ''
  }
})

const onCancelClick = () => {
  isModalShow.value = false
}
const onUpdateClick = () => {
  emit('updateTask', {
    id: props.id,
    description: description.value
  })
  isModalShow.value = false
}
</script>

<style lang="scss" scoped>
.edit-todo-modal {
  width: 300px;
  height: 500px;
}
</style>
