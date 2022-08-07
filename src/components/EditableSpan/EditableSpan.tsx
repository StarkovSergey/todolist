import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
  const [edited, setEdited] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)

  const turnOnEditMode = () => {
    setEdited(true)
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      turnOffEditMode()
    }
  }

  const turnOffEditMode = () => {
    if (title.trim()) {
      props.changeTitle(title)
    }
    setEdited(false)
    setTitle(props.title)
  }

  return edited ? (
    <TextField
      value={title}
      onChange={inputChangeHandler}
      onKeyDown={inputKeyDownHandler}
      onBlur={turnOffEditMode}
      autoFocus
      variant="outlined"
      size="small"
    />
  ) : (
    <span onDoubleClick={turnOnEditMode}>{props.title}</span>
  )
})
