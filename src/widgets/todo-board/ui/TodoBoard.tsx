import { TodoItem, type Todo, type TodoFilter } from '../../../entities/todo';
import { TodoForm } from '../../../features/todo-add';
import { TodoFilterBar } from '../../../features/todo-filter';
import './TodoBoard.css';

interface TodoBoardProps {
  /** 현재 필터가 적용된 할 일 목록 */
  todos: Todo[];
  /** 전체 할 일 개수 */
  totalCount: number;
  /** 남은 할 일 개수 */
  remainingCount: number;
  /** 완료된 할 일 개수 */
  completedCount: number;
  /** 현재 선택된 필터 */
  filter: TodoFilter;
  /** 할 일 추가 핸들러 */
  onAddTodo: (title: string) => void;
  /** 할 일 완료 토글 핸들러 */
  onToggleTodo: (id: string) => void;
  /** 할 일 삭제 핸들러 */
  onDeleteTodo: (id: string) => void;
  /** 필터 변경 핸들러 */
  onChangeFilter: (filter: TodoFilter) => void;
  /** 완료된 항목 일괄 삭제 핸들러 */
  onClearCompleted: () => void;
}

/**
 * 할 일 입력, 필터링, 목록 표시를 통합하는 메인 보드 위젯입니다.
 */
export function TodoBoard({
  todos,
  totalCount,
  remainingCount,
  completedCount,
  filter,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onChangeFilter,
  onClearCompleted,
}: TodoBoardProps) {
  const emptyMessage =
    totalCount === 0
      ? '아직 등록된 할 일이 없습니다. 위 입력창에 첫 번째 할 일을 추가해 보세요.'
      : filter === 'active'
        ? '진행 중인 할 일이 없습니다.'
        : '완료된 할 일이 없습니다.';

  return (
    <section className="todo-board" aria-label="할 일 보드">
      <TodoForm onAdd={onAddTodo} />

      <TodoFilterBar
        filter={filter}
        remainingCount={remainingCount}
        completedCount={completedCount}
        onChangeFilter={onChangeFilter}
        onClearCompleted={onClearCompleted}
      />

      {todos.length > 0 ? (
        <ul className="todo-board__list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      ) : (
        <div className="todo-board__empty" role="status">
          <p className="todo-board__empty-text">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
