import { appReducer, AppStateType, changeAppStatus, setAppError } from './app-reducer'

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: true,
  }
})

test('app status should be changed', () => {
  const endState = appReducer(startState, changeAppStatus({ status: 'loading' }))

  expect(endState.status).toBe('loading')
})

test('app error should be changed', () => {
  const endState = appReducer(startState, setAppError({ error: 'boom' }))

  expect(endState.error).toBe('boom')
})
