import { AddItemBox, PropsType } from './AddItemBox'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'
import { string } from 'prop-types'

export default {
  title: 'AddItemBox',
  component: AddItemBox,
  argTypes: {
    placeholder: {
      type: string,
      description: 'just placeholder',
    }
  },
}

const Template: Story<PropsType> = (args) => <AddItemBox {...args}/>

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  addItem: action('Add item'),
  placeholder: 'Cat'
}

export const WithoutPlaceholder = Template.bind({})
WithoutPlaceholder.args = {
  addItem: action('Add item'),
}
