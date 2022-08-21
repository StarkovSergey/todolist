import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'api-key': '7e8f6e63-03e5-4658-aa82-7f22050eb9f3',
  },
})

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export enum TaskStatuses {
  New = 0,
  inProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

type getTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}

type ResponseType<T = {}> = {
  item: T
  resultCode: number
  messages: string[]
}

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`)
  },
  addTodolist(title: string) {
    return instance.post<ResponseType<TodolistType>>(`todo-lists`, { title })
  },
  removeTodolist(todolistID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
  },
  changeTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}`, { title })
  },
  getTasks(todolistID: string) {
    return instance.get<getTasksResponseType>(`todo-lists/${todolistID}/tasks`)
  },
  addTask(todolistID: string, title: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks`, { title })
  },
  removeTask(todolistID: string, taskID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
  },
  updateTask(todolistID: string, taskID: string, model: UpdateTaskType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
  }
}