import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import style from './AddItemBox.module.css'

export type PropsType = {
  addItem: (title: string) => void
  placeholder?: string
}

export function AddItemBox(props: PropsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<null | string>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = () => {
    if (title.trim()) {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }

    // TODO: спросить, позволительно ли это на support
    inputRef.current?.querySelector('input')?.focus()
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(evt.currentTarget.value)
  }

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div className={style.box}>
      <TextField
        value={title}
        onChange={inputChangeHandler}
        onKeyDown={inputKeyDownHandler}
        ref={inputRef}
        placeholder={props.placeholder}
        label={error}
        error={!!error}
        variant="outlined"
        size="small"
      />

      <IconButton onClick={addItem} color="secondary" aria-label="add item" size="small">
        <AddCircleIcon />
      </IconButton>
    </div>
  )
}
