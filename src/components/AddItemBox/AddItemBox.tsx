import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

type PropsType = {
  addItem: (title: string) => void;
};

export function AddItemBox(props: PropsType) {
  const [title, setTitle] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = () => {
    props.addItem(title);
    setTitle('');
    inputRef.current?.focus();
  };

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.currentTarget.value);
  };

  const inputKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={inputChangeHandler} onKeyDown={inputKeyDownHandler} ref={inputRef} />
      <button onClick={addItem}>add</button>
    </div>
  );
}
