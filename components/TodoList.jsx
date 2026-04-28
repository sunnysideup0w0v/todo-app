import TodoItem from './TodoItem'

const EMPTY_MESSAGES = {
  all: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 12V9a2 2 0 012-2h12a2 2 0 012 2v3" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 24h12M18 31h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: '할 일이 없습니다',
    sub: '위에서 새 할 일을 추가해보세요!',
  },
  active: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: '모든 할 일 완료!',
    sub: '오늘도 수고했어요 :)',
  },
  completed: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M12 24h24M12 16h24M12 32h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: '완료된 항목이 없습니다',
    sub: '할 일을 완료하면 여기서 볼 수 있어요',
  },
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    const msg = EMPTY_MESSAGES[filter]
    return (
      <div className="empty-state">
        <div className="empty-icon">{msg.icon}</div>
        <p className="empty-text">{msg.text}</p>
        <p className="empty-sub">{msg.sub}</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
