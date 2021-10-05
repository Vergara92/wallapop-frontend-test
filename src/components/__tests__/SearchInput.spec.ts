import { mount } from '@vue/test-utils'
import SearchInput from '../SearchInput.vue'

jest.useFakeTimers()

describe('SearchInput Component', () => {
  it('Input should emit event when value change', async () => {
    const wrapper = mount(SearchInput)
    const textInput = wrapper.find('input')

    await textInput.setValue('Iphone')

    jest.runOnlyPendingTimers()

    expect(wrapper.emitted('change-filter-value')).toEqual([['Iphone']])
  })
  it('Input should emit event only one event when value change in short time', async () => {
    const wrapper = mount(SearchInput)
    const textInput = wrapper.find('input')

    await textInput.setValue('Iph')
    await textInput.setValue('Iphpo')
    await textInput.setValue('Iphone')

    jest.runOnlyPendingTimers()

    expect(wrapper.emitted('change-filter-value')).toEqual([['Iphone']])
  })
})
