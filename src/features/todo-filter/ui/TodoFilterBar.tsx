import type { TodoFilter } from '../../../entities/todo';
import './TodoFilterBar.css';

interface TodoFilterBarProps {
  /** 현재 선택된 필터 */
  filter: TodoFilter;
  /** 남은 할 일 개수 */
  remainingCount: number;
  /** 완료된 할 일 개수 */
  completedCount: number;
  /** 필터 변경 핸들러 */
  onChangeFilter: (filter: TodoFilter) => void;
  /** 완료된 항목 일괄 삭제 핸들러 */
  onClearCompleted: () => void;
}

const FILTER_OPTIONS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

/**
 * 할 일 목록 필터 탭과 상태 요약, 완료 항목 정리 버튼을 제공하는 컴포넌트입니다.
 */
export function TodoFilterBar({
  filter,
  remainingCount,
  completedCount,
  onChangeFilter,
  onClearCompleted,
}: TodoFilterBarProps) {
  return (
    <div className="todo-filter-bar">
      <div className="todo-filter-bar__tabs" role="tablist" aria-label="할 일 필터">
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`todo-filter-bar__tab ${isActive ? 'todo-filter-bar__tab--active' : ''}`}
              onClick={() => onChangeFilter(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="todo-filter-bar__meta">
        <span className="todo-filter-bar__count">남은 할 일 {remainingCount}개</span>
        {completedCount > 0 && (
          <button
            type="button"
            className="todo-filter-bar__clear"
            onClick={onClearCompleted}
          >
            완료 항목 삭제
          </button>
        )}
      </div>
    </div>
  );
}
