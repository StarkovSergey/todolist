import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { TextField } from '@mui/material'

import style from './EditableSpan.module.css'

type PropsType = {
  title: string
  changeTitle: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = React.memo((props: PropsType) => {
  const [edited, setEdited] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)

  const turnOnEditMode = () => {
    if (props.disabled) {
      return
    }
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
    if (title.trim() && title !== props.title) {
      props.changeTitle(title)
    }
    setEdited(false)
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
      sx={{ maxWidth: 'fit-content' }}
      disabled={props.disabled}
    />
  ) : (
    <span onDoubleClick={turnOnEditMode} className={props.disabled ? style.disabled : ''}>
      {props.title}
    </span>
  )
})
