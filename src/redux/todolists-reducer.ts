import { v1 } from 'uuid'
import { TodolistType } from '../api/todolist-api'

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>

type ActionsType = changeTodolistFilterAT | removeTodolistAT | changeTodolistTitleAT | addTodolistAT

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((todolist) =>
        todolist.id === action.todolistID ? { ...todolist, filter: action.filter } : todolist
      )
    case 'REMOVE-TODOLIST':
      return state.filter((todolist) => todolist.id !== action.todolistID)
    case 'CHANGE-TODOLIST-TITLE':
      return state
        .map((todolist) => todolist.id === action.todolistID ? {...todolist, title: action.title} : todolist)
    case 'ADD-TODOLIST':
      const newTodolist: TodolistDomainType = {
        id: action.id,
        title: action.title,
        addedDate: '',
        order: 0,
        filter: 'all'
      }
      return [newTodolist, ...state]
    default:
      return state
  }
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterType) => ({
  type: 'CHANGE-TODOLIST-FILTER' as const,
  todolistID,
  filter,
})

export const removeTodolistAC = (todolistID: string) => ({
  type: 'REMOVE-TODOLIST' as const,
  todolistID
})

export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE' as const,
  todolistID,
  title
})

export const addTodolistAC = (title: string) => {
  const newTodolistID = v1()

  return {
    type: 'ADD-TODOLIST' as const,
    id: newTodolistID,
    title
  }
}
