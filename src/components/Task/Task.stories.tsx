import { Task } from './Task'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { TaskType } from '../../App'
import { ReduxStoreProviderDecorator } from '../../stories/decorators/ReduxStoreProviderDecorator'

export default {
  title: 'Task',
  component: Task,
  argTypes: { // описание аргументов
    todolistID: {
      description: 'just a todolist ID'
    }
  },
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const UsingReduxComponent = () => {
  const task = useSelector<AppRootStateType, TaskType>((state) => state.tasks['todolistId1'][0])

  return <Task task={task} todolistID={'todolistId1'}/>
}

const Template: ComponentStory<typeof UsingReduxComponent> = (args) => <UsingReduxComponent />

export const TaskStory = Template.bind({})
