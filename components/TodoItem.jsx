import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EditTodoForm } from './TodoForm'
import { format, differenceInCalendarDays } from 'date-fns'
import { ko } from 'date-fns/locale'

function getDeadlineBadge(deadline, completed) {
  if (!deadline) return null
  const days = differenceInCalendarDays(new Date(deadline), new Date())
  const label = format(new Date(deadline), 'M/d (eee)', { locale: ko })

  if (completed) {
    return { text: label, className: 'bg-slate-100 text-slate-400 border-slate-200' }
  }
  if (days < 0) {
    return { text: `기한 초과 · ${label}`, className: 'bg-red-100 text-red-700 border-red-200' }
  }
  if (days === 0) {
    return { text: `오늘 마감 · ${label}`, className: 'bg-amber-100 text-amber-700 border-amber-200' }
  }
  if (days <= 3) {
    return { text: `D-${days} · ${label}`, className: 'bg-orange-100 text-orange-700 border-orange-200' }
  }
  return { text: `D-${days} · ${label}`, className: 'bg-blue-100 text-blue-700 border-blue-200' }
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const badge = getDeadlineBadge(todo.deadline, todo.completed)

  return (
    <li className="group flex items-start gap-3 px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors animate-slide-down">
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '완료 취소' : '완료 표시'}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
          ${todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'
          }`}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm font-semibold leading-snug ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {todo.title}
          </span>
          {badge && (
            <Badge className={`text-xs px-2 py-0 h-5 border font-medium ${badge.className}`}>
              {badge.text}
            </Badge>
          )}
        </div>

        {todo.content && (
          <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${todo.completed ? 'text-slate-300' : 'text-slate-500'}`}>
            {todo.content}
          </p>
        )}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <EditTodoForm todo={todo} onEdit={onEdit}>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-violet-600 hover:bg-violet-50"
            aria-label="수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </EditTodoForm>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50"
          onClick={() => onDelete(todo.id)}
          aria-label="삭제"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </li>
  )
}
