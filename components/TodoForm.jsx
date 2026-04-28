import { useState, useEffect } from 'react'
import { Plus, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import DeadlinePicker from './DeadlinePicker'

function TodoFormFields({ title, setTitle, content, setContent, deadline, setDeadline }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="todo-title">
          제목 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="todo-title"
          placeholder="할 일 제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="todo-content">
          내용{' '}
          <span className="text-muted-foreground text-xs font-normal">(선택)</span>
        </Label>
        <Textarea
          id="todo-content"
          placeholder="상세 내용을 입력하세요..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label>
          마감기한{' '}
          <span className="text-muted-foreground text-xs font-normal">(선택)</span>
        </Label>
        <DeadlinePicker value={deadline} onChange={setDeadline} />
      </div>
    </div>
  )
}

export function AddTodoForm({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState(null)

  const reset = () => {
    setTitle('')
    setContent('')
    setDeadline(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title, content, deadline })
    reset()
    setOpen(false)
  }

  const handleOpenChange = (next) => {
    setOpen(next)
    if (!next) reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 rounded-none h-14 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-none">
          <Plus className="h-5 w-5" />
          할 일 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>새 할 일</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <TodoFormFields
            title={title} setTitle={setTitle}
            content={content} setContent={setContent}
            deadline={deadline} setDeadline={setDeadline}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={!title.trim()}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              추가하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditTodoForm({ todo, onEdit, children }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState(null)

  useEffect(() => {
    if (open) {
      setTitle(todo.title)
      setContent(todo.content)
      setDeadline(todo.deadline)
    }
  }, [open, todo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onEdit(todo.id, { title, content, deadline })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>할 일 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <TodoFormFields
            title={title} setTitle={setTitle}
            content={content} setContent={setContent}
            deadline={deadline} setDeadline={setDeadline}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={!title.trim()}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              저장하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
