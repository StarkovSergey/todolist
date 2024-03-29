import { Task } from './Task'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../../app/store'
import { ReduxStoreProviderDecorator } from '../../../../stories/decorators/ReduxStoreProviderDecorator'
import { TaskType } from '../../../../api/todolist-api'
import { TaskDomainType } from '../../tasks-reducer'

export default {
  title: 'Task',
  component: Task,
  argTypes: {
    todolistID: {
      description: 'just a todolist ID',
    },
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

const UsingReduxComponent = () => {
  const task = useSelector<AppRootStateType, TaskDomainType>((state) => state.tasks['todolistId1'][0])

  return <Task task={task} todolistID={'todolistId1'} />
}

const Template: ComponentStory<typeof UsingReduxComponent> = (args) => <UsingReduxComponent />

export const TaskStory = Template.bind({})
