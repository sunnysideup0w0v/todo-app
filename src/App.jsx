import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'
import TodoFooter from './components/TodoFooter'
import './App.css'

export default function App() {
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
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">TODO</h1>
          <p className="subtitle">오늘의 할 일을 관리하세요</p>
        </header>

        <main className="card">
          <TodoInput onAdd={addTodo} />

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
        </main>

        <p className="hint">더블 클릭으로 수정 · Enter로 추가</p>
      </div>
    </div>
  )
}
