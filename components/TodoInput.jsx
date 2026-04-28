import { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-input-wrapper" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="새로운 할 일을 입력하세요..."
        value={text}
        onChange={e => setText(e.target.value)}
        autoFocus
      />
      <button type="submit" className="add-btn" aria-label="추가">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </form>
  )
}
