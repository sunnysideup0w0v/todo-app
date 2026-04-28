export default function TodoFooter({ activeCount, completedCount, totalCount, onClearCompleted }) {
  const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="border-t border-slate-100">
      <div className="h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-500 rounded-r-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50">
        <span className="text-xs text-slate-500">
          <span className="font-bold text-violet-600">{activeCount}</span>개 남음
        </span>
        <span className="text-xs text-slate-400 font-medium">{pct}% 완료</span>
        <button
          onClick={onClearCompleted}
          disabled={completedCount === 0}
          className="text-xs text-slate-500 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-500 px-2 py-1 rounded hover:bg-red-50"
        >
          완료 항목 삭제
        </button>
      </div>
    </div>
  )
}
