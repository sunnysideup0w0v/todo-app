export default function TodoFooter({ activeCount, completedCount, totalCount, onClearCompleted }) {
  const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="todo-footer">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="footer-row">
        <span className="items-left">
          <strong>{activeCount}</strong>개 남음
        </span>
        <span className="progress-label">{pct}% 완료</span>
        <button
          className="clear-btn"
          onClick={onClearCompleted}
          disabled={completedCount === 0}
        >
          완료 항목 삭제
        </button>
      </div>
    </div>
  )
}
