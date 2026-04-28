import { useState, useEffect } from 'react'

const STORAGE_KEY = 'vibe-todos'

function normalize(todo) {
  return {
    id: todo.id,
    title: todo.title ?? todo.text ?? '',
    content: todo.content ?? '',
    deadline: todo.deadline ?? null,
    completed: todo.completed,
  }
}

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setTodos(JSON.parse(stored).map(normalize))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos, loaded])

  const addTodo = ({ title, content = '', deadline = null }) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos(prev => [
      { id: Date.now(), title: trimmed, content: content.trim(), deadline, completed: false },
      ...prev,
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id, { title, content, deadline }) => {
    const trimmed = title.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos(prev =>
      prev.map(t => t.id === id
        ? { ...t, title: trimmed, content: content.trim(), deadline }
        : t
      )
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos: filteredTodos,
    totalCount: todos.length,
    activeCount,
    completedCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  }
}
