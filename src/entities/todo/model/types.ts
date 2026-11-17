/**
 * 개별 할 일 항목을 나타내는 타입입니다.
 */
export interface Todo {
  /** 고유 식별자 */
  id: string;
  /** 할 일 내용 */
  title: string;
  /** 완료 여부 */
  completed: boolean;
  /** 생성 시각 (Unix timestamp) */
  createdAt: number;
}

/**
 * 할 일 목록 필터 상태 타입입니다.
 */
export type TodoFilter = 'all' | 'active' | 'completed';
