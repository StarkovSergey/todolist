import { AddItemBox } from './AddItemBox'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { string } from 'prop-types'
import { MUIThemeDecorator } from '../../stories/decorators/MUIThemeDecorator'

export default {
  title: 'AddItemBox',
  component: AddItemBox,
  argTypes: {
    addItem: {
      description: 'add item'
    },
    placeholder: {
      type: string,
      description: 'just placeholder',
    }
  },
  decorators: [MUIThemeDecorator]
} as ComponentMeta<typeof AddItemBox>

const Template: ComponentStory<typeof AddItemBox> = (args) => <AddItemBox {...args}/>

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  addItem: action('Add item'),
  placeholder: 'Cat'
}

export const WithoutPlaceholder = Template.bind({})
WithoutPlaceholder.args = {
  addItem: action('Add item'),
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
