import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
}

export function EditableSpan(props: PropsType) {
  const [edited, setEdited] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)

  const toggleEditedMode = () => {
    setEdited(!edited)
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      changeTitle()
    }
  }

  const changeTitle = () => {
    props.changeTitle(title)
    setEdited(false)
  }

  return edited ? (
    <TextField
      value={title}
      onChange={inputChangeHandler}
      onKeyDown={inputKeyDownHandler}
      onBlur={changeTitle}
      autoFocus
      variant="outlined"
      size="small"
    />
  ) : (
    <span onDoubleClick={toggleEditedMode}>{title}</span>
  )
}
