export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: AppStateType = {
  status: 'idle'
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    default:
      return state
  }
}

// types
type AppStateType = {
  status: RequestStatusType
}

export const setAppStatusAC = (status: RequestStatusType) => ({
  type: 'APP/SET-STATUS' as const,
  status
})

export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
