import App from './App'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator'

export default {
  title: 'App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App demo={true} />

export const AppStory = Template.bind({})
AppStory.args = {}
