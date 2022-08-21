import { EditableSpan } from './EditableSpan'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MUIThemeDecorator } from '../../stories/decorators/MUIThemeDecorator'

export default {
  title: 'EditableSpan',
  component: EditableSpan,
  argTypes: {
    title: {
      description: 'text value in the editable span'
    }
  },
  args: {
    title: 'some text'
  },
  decorators: [MUIThemeDecorator]
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
  changeTitle: action('value is changed')
}
