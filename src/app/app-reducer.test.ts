import { appReducer, AppStateType, changeAppStatusAC, setAppErrorAC } from './app-reducer'

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: true,
  }
})

test('app status should be changed', () => {
  const endState = appReducer(startState, changeAppStatusAC('loading'))

  expect(endState.status).toBe('loading')
})

test('app error should be changed', () => {
  const endState = appReducer(startState, setAppErrorAC('boom'))

  expect(endState.error).toBe('boom')
})
