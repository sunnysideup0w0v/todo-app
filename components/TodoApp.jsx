'use client'

import { useTodos } from '@/hooks/useTodos'
import { AddTodoForm } from './TodoForm'
import TodoList from './TodoList'
import FilterBar from './FilterBar'
import TodoFooter from './TodoFooter'

export default function TodoApp() {
  const {
    todos,
    totalCount,
    activeCount,
    completedCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-purple-700 flex items-start justify-center pt-16 px-5 pb-12">
      <div className="w-full max-w-[540px]">
        <header className="text-center mb-7">
          <h1 className="text-5xl font-black text-white tracking-[0.35em] drop-shadow-md">TODO</h1>
          <p className="mt-2 text-white/70 text-sm">오늘의 할 일을 관리하세요</p>
        </header>

        <div className="bg-white rounded-2xl shadow-[0_25px_60px_rgba(109,40,217,0.25),0_8px_20px_rgba(0,0,0,0.08)] overflow-hidden">
          <AddTodoForm onAdd={addTodo} />

          {totalCount > 0 && (
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={totalCount}
            />
          )}

          <TodoList
            todos={todos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {totalCount > 0 && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={totalCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
    </div>
  )
}
