import { useState, type FormEvent } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  /** 새 할 일 추가 핸들러 */
  onAdd: (title: string) => void;
}

/**
 * 새로운 할 일을 입력하고 추가하는 폼 컴포넌트입니다.
 */
export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-form__input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="할 일을 입력하세요..."
        aria-label="새 할 일 입력"
        maxLength={120}
      />
      <button
        type="submit"
        className="todo-form__submit"
        disabled={!title.trim()}
      >
        추가
      </button>
    </form>
  );
}
