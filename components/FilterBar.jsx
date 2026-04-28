const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'completed', label: '완료' },
]

export default function FilterBar({ filter, onFilterChange, activeCount, completedCount, totalCount }) {
  const counts = { all: totalCount, active: activeCount, completed: completedCount }

  return (
    <div className="flex gap-1.5 px-5 py-3 border-b border-slate-100 bg-slate-50">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border
            ${filter === key
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
              : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50'
            }`}
        >
          {label}
          <span className={`text-xs rounded-full px-1.5 min-w-[20px] text-center leading-5
            ${filter === key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  )
}
