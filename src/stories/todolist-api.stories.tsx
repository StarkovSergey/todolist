import { TaskPriorities, TaskStatuses, todolistAPI, UpdateTaskType } from '../api/todolist-api'
import { useState } from 'react'

export default {
  title: 'api/todolist',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  const getTodolists = () => {
    todolistAPI.getTodolists()
      .then((response) => {
        setState(response.data)
      })
  }

  return <>
    <button onClick={getTodolists}>get todolists</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const AddTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')

  const addTodolist = () => {
    todolistAPI.addTodolist(title)
      .then((response) => {
        setState(response.data)
        setTitle('')
      })
  }

  return <>
    <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
    <button onClick={addTodolist}>add todolist</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const RemoveTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<any>('')

  const removeTodolist = () => {
    todolistAPI.removeTodolist(todolistID)
      .then((response) => {
        setState(response.data)
        setTodolistID('')
      })
  }

  return <>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <button onClick={removeTodolist}>remove todolist</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const ChangeTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [todolistID, setTodolistID] = useState<any>('')

  const changeTodolistTitle = () => {
    todolistAPI.changeTodolistTitle(todolistID, title)
      .then((response) => {
        console.log(response)
        setState(response.data)
        setTitle('')
        setTodolistID('')
      })
  }

  return <>
    <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="todolist title"/>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <button onClick={changeTodolistTitle}>change todolist title</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<any>('')

  const getTasks = () => {
    todolistAPI.getTasks(todolistID)
      .then((response) => {
        setState(response.data)
        setTodolistID('')
      })
  }

  return <>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <button onClick={getTasks}>get tasks</button>
    <div>{JSON.stringify(state)}</div>
  </>
}


export const AddTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [todolistID, setTodolistID] = useState<any>('')

  const addTask = () => {
    todolistAPI.addTask(todolistID, title)
      .then((response) => {
        setState(response.data)
        setTitle('')
        setTodolistID('')
      })
  }

  return <>
    <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="task title"/>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <button onClick={addTask}>addTask</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const RemoveTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskID, setTaskID] = useState('')
  const [todolistID, setTodolistID] = useState<any>('')

  const removeTask = () => {
    todolistAPI.removeTask(todolistID, taskID)
      .then((response) => {
        setState(response.data)
        setTaskID('')
        setTodolistID('')
      })
  }

  return <>
    <input value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)} placeholder="task ID"/>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <button onClick={removeTask}>remove task</button>
    <div>{JSON.stringify(state)}</div>
  </>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskID, setTaskID] = useState('')
  const [todolistID, setTodolistID] = useState<any>('')
  const [modelTitle, setModelTitle] = useState<any>('')

  const model: UpdateTaskType = {
    title: modelTitle,
    description: '',
    status: TaskStatuses.New,
    priority: TaskPriorities.Hi,
    startDate: '',
    deadline: '',
  }

  const updateTask = () => {
    todolistAPI.updateTask(todolistID, taskID, model)
      .then((response) => {
        setState(response.data)
        setModelTitle('')
      })
  }

  return <>
    <input value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)} placeholder="task ID"/>
    <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)} placeholder="todolist ID"/>
    <input value={modelTitle} onChange={(e) => setModelTitle(e.currentTarget.value)} placeholder="model title"/>
    <button onClick={updateTask}>update task</button>
    <div>{JSON.stringify(state)}</div>
  </>
}
