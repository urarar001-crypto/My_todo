import { useTodos } from '../../../entities/todo';
import { TodoBoard } from '../../../widgets/todo-board';
import './HomePage.css';

/**
 * 오늘 날짜를 한국어 형식으로 반환합니다.
 */
function formatTodayLabel(): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());
}

/**
 * 할 일 관리 앱의 메인 페이지 컴포넌트입니다.
 */
export function HomePage() {
  const {
    filteredTodos,
    filter,
    stats,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <main className="home-page">
      <div className="home-page__container">
        <header className="home-page__header">
          <div className="home-page__title-group">
            <p className="home-page__date">{formatTodayLabel()}</p>
            <h1 className="home-page__title">오늘의 할 일</h1>
          </div>

          <div className="home-page__progress" aria-label="진행률 요약">
            <span className="home-page__progress-text">
              완료 {stats.completed} / {stats.total}
            </span>
            <span className="home-page__progress-badge">{completionRate}%</span>
          </div>
        </header>

        <TodoBoard
          todos={filteredTodos}
          totalCount={stats.total}
          remainingCount={stats.remaining}
          completedCount={stats.completed}
          filter={filter}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onChangeFilter={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}
