export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: AppStateType = {
  status: 'idle',
  error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/CHANGE-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

// types
export type AppStateType = {
  status: RequestStatusType
  error: null | string
}

export const changeAppStatusAC = (status: RequestStatusType) => ({
  type: 'APP/CHANGE-STATUS' as const,
  status
})

export const setAppErrorAC = (error: string | null) => ({
  type: 'APP/SET-ERROR' as const,
  error
})

export type AppActionsType =
  | ReturnType<typeof changeAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
