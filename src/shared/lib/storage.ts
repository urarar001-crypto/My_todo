/**
 * LocalStorage에서 JSON 데이터를 안전하게 불러옵니다.
 * 파싱에 실패하거나 저장된 값이 없으면 기본값을 반환합니다.
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * 데이터를 JSON 문자열로 변환하여 LocalStorage에 저장합니다.
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 공간 부족 또는 프라이빗 모드 등 저장 불가 환경에서는 조용히 무시합니다.
  }
}
