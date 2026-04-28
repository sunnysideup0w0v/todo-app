import TodoItem from './TodoItem'
import { ClipboardList, CheckCircle2, AlignLeft } from 'lucide-react'

const EMPTY_MESSAGES = {
  all: { Icon: ClipboardList, text: '할 일이 없습니다', sub: '아래 버튼으로 새 할 일을 추가해보세요!' },
  active: { Icon: CheckCircle2, text: '모든 할 일을 완료했어요!', sub: '오늘도 수고했어요 :)' },
  completed: { Icon: AlignLeft, text: '완료된 항목이 없습니다', sub: '할 일을 완료하면 여기서 볼 수 있어요' },
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    const { Icon, text, sub } = EMPTY_MESSAGES[filter]
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-slate-400" />
        </div>
        <p className="text-sm font-semibold text-slate-600 mb-1">{text}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    )
  }

  return (
    <ul>
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
