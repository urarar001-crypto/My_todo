import type { Todo } from '../model/types';
import './TodoItem.css';

interface TodoItemProps {
  /** 표시할 할 일 데이터 */
  todo: Todo;
  /** 완료 상태 토글 핸들러 */
  onToggle: (id: string) => void;
  /** 삭제 핸들러 */
  onDelete: (id: string) => void;
}

/**
 * 개별 할 일 항목을 렌더링하는 컴포넌트입니다.
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          className="todo-item__checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`"${todo.title}" 완료 여부 전환`}
        />
        <span className="todo-item__check-indicator" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="todo-item__title">{todo.title}</span>
      </label>

      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`"${todo.title}" 삭제`}
        title="삭제"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6 6L14 14M14 6L6 14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}
