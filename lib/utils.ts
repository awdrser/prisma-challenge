export function toLocalDateOrTimeString(createdAt: Date) {
  const diffMs = Date.now() - createdAt.getTime();

  // (선택) 미래 시간이면 방어
  if (diffMs < 0) return "방금 전";

  const minuteMs = 1000 * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;

  // 0~59분
  if (diffMs < hourMs) {
    const minutes = Math.max(1, Math.floor(diffMs / minuteMs));
    return `${minutes}분 전`;
  }

  // 1~23시간
  if (diffMs < dayMs) {
    const hours = Math.floor(diffMs / hourMs);
    return `${hours}시간 전`;
  }

  // 24시간 이상: 짧은 날짜(예: 1. 9.)
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
  }).format(createdAt);
}
