import App from '@/App.vue'
import { mountComponent } from '@test/unit/testhelper'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

describe('App.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof App>>
  beforeAll(() => {
    // @ts-expect-error ignore the type error temporarily
    wrapper = mountComponent<InstanceType<typeof App>>(App, {
      global: {
        stubs: {
          teleport: true
        }
      }
    })
  })

  test('should mount', () => {
    expect(wrapper.findComponent(App).exists()).toBe(true)
  })
})
