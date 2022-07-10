import { FilterType, TaskType } from '../../App';
import { ChangeEvent } from 'react';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { AddItemBox } from '../AddItemBox/AddItemBox';

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTodolist: (todolistID: string) => void;
  changeTodolistFilter: (todolistID: string, filter: FilterType) => void;
  changeTodolistTitle: (todolistID: string, title: string) => void;
  removeTask: (todolistID: string, taskID: string) => void;
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
  changeTaskTitle: (todolistID: string, taskID: string, title: string) => void;
  addTask: (todolistID: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  const tasksElements = props.tasks.map((task) => {
    const removeTask = () => {
      props.removeTask(props.id, task.id);
    };

    const checkboxTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(props.id, task.id, evt.currentTarget.checked);
    };

    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(props.id, task.id, title);
    };

    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} onChange={checkboxTaskHandler} />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
        <button onClick={removeTask}>x</button>
      </li>
    );
  });

  const addTask = (title: string) => {
    props.addTask(props.id, title);
  };

  const changeTodolistFilter = (filter: FilterType) => {
    props.changeTodolistFilter(props.id, filter);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
        <button onClick={removeTodolist}>X</button>
      </h3>
      <AddItemBox addItem={addTask} />
      <ul>{tasksElements}</ul>
      <div>
        <button onClick={() => changeTodolistFilter('all')}>All</button>
        <button onClick={() => changeTodolistFilter('active')}>Active</button>
        <button onClick={() => changeTodolistFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}
