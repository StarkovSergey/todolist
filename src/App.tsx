import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist/Todolist';
import { AddItemBox } from './components/AddItemBox/AddItemBox';

export type FilterType = 'all' | 'active' | 'completed';
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TasksStateType = {
  [id: string]: TaskType[];
};
export type TodolistType = {
  id: string;
  title: string;
  filter: 'all' | 'active' | 'completed';
};

function App() {
  const todolistID_1 = v1();
  const todolistID_2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID_1, title: 'What to learn', filter: 'all' },
    { id: todolistID_2, title: 'What to buy', filter: 'active' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistID_1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todolistID_2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Cookie', isDone: true },
      { id: v1(), title: 'Book - "Hobbit"', isDone: true },
      { id: v1(), title: 'Ice Cream', isDone: false },
      { id: v1(), title: 'Juice', isDone: false },
    ],
  });

  const changeTodolistFilter = (todolistID: string, filter: FilterType) => {
    setTodolists(todolists.map((todolist) => (todolist.id === todolistID ? { ...todolist, filter } : todolist)));
  };

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistID));
  };

  const changeTodolistTitle = (todolistID: string, title: string) => {
    setTodolists(todolists.map((todolist) => (todolist.id === todolistID ? { ...todolist, title } : todolist)));
  };

  const addTodolist = (title: string) => {
    const newTodolistID = v1();
    const newTodolist: TodolistType = {
      id: newTodolistID,
      title,
      filter: 'all',
    };

    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newTodolistID]: [] });
  };

  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter((task) => task.id !== taskID) });
  };

  const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((task) => (task.id === taskID ? { ...task, isDone } : task)),
    });
  };

  const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((task) => (task.id === taskID ? { ...task, title } : task)),
    });
  };

  const addTask = (todolistID: string, title: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };

    setTasks({
      ...tasks,
      [todolistID]: [newTask, ...tasks[todolistID]],
    });
  };

  const todolistsComponents = todolists.map((todolist) => {
    let filteredTasks: TaskType[];

    switch (todolist.filter) {
      case 'active':
        filteredTasks = tasks[todolist.id].filter((task) => !task.isDone);
        break;
      case 'completed':
        filteredTasks = tasks[todolist.id].filter((task) => task.isDone);
        break;
      default:
        filteredTasks = tasks[todolist.id];
    }

    return (
      <Todolist
        key={todolist.id}
        id={todolist.id}
        title={todolist.title}
        tasks={filteredTasks}
        removeTodolist={removeTodolist}
        changeTodolistFilter={changeTodolistFilter}
        changeTodolistTitle={changeTodolistTitle}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        addTask={addTask}
      />
    );
  });

  return <div className="App">
    <AddItemBox addItem={addTodolist}/>
    {todolistsComponents}
  </div>;
}

export default App;
