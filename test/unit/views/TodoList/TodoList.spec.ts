import TodoList from '@/views/TodoList/TodoList.vue'
import EditTodoModal from '@/views/TodoList/containers/EditTodoModal.vue'
import TodoItem from '@/views/TodoList/containers/TodoItem.vue'
import { mountComponent } from '@test/unit/testhelper'
import { VueWrapper } from '@vue/test-utils'
import { NButton, NCheckbox } from 'naive-ui'
import { ComponentPublicInstance } from 'vue'

const waitForDBExecution = async () => {
  // flushPromises doesn't work here
  // await flushPromises()

  // so set timeout for one second to wait DB execution done
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

describe('TodoList.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof TodoList>>
  beforeAll(() => {
    // @ts-expect-error ignore the type error temporarily
    wrapper = mountComponent<InstanceType<typeof TodoList>>(TodoList, {
      global: {
        stubs: {
          teleport: true
        }
      }
    })
  })
  test('can add todo item', async () => {
    await wrapper.find('input').setValue('new task')
    await wrapper.findComponent(NButton).trigger('click')

    await waitForDBExecution()

    const value = wrapper.find('input').element.value
    expect(value).toBe('')

    expect(wrapper.findComponent(TodoItem).exists()).toBe(true)
  })

  test('can set complete status of todo item', async () => {
    const checkbox = await wrapper.findComponent(NCheckbox)
    expect(checkbox.element.className).not.contains('n-checkbox--checked')

    await wrapper.findComponent(NCheckbox).trigger('click')

    await waitForDBExecution()

    expect(checkbox.element.className).contains('n-checkbox--checked')
  })

  test('can edit todo item', async () => {
    expect(wrapper.find('.description').text()).toBe('new task')

    const editTodoModal = wrapper.getComponent(EditTodoModal)

    expect(editTodoModal.isVisible()).toBe(false)
    await wrapper.find('[data-test-id="edit-btn"]').trigger('click')
    expect(editTodoModal.isVisible()).toBe(true)

    editTodoModal.find('input').setValue('edited task')
    await editTodoModal.find('[data-test-id="update-btn"]').trigger('click')

    await waitForDBExecution()

    expect(wrapper.find('.description').text()).toBe('edited task')
  })

  test('close editTodoModal after click cancel button', async () => {
    const editTodoModal = wrapper.getComponent(EditTodoModal)

    await wrapper.find('[data-test-id="edit-btn"]').trigger('click')

    expect(
      editTodoModal.find('[data-test-id="edit-todo-modal-header"]').exists()
    ).toBe(true)

    await editTodoModal.find('[data-test-id="cancel-btn"]').trigger('click')

    await waitForDBExecution()

    expect(
      editTodoModal.find('[data-test-id="edit-todo-modal-header"]').exists()
    ).toBe(false)
  })

  test('can delete todo item', async () => {
    expect(wrapper.findComponent(TodoItem).exists()).toBe(true)

    await wrapper.find('[data-test-id="delete-btn"]').trigger('click')

    await waitForDBExecution()

    expect(wrapper.findComponent(TodoItem).exists()).toBe(false)
  })
})
