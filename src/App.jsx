import { useMemo } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const todos = useSelector((state) => state.todos)

  const stats = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length
    return {
      total: todos.length,
      completed: completedCount,
      active: todos.length - completedCount,
    }
  }, [todos])

  return (
    <Box className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <Box className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Header stats={stats} />

        <Box className="rounded-[28px] border border-slate-200/80 bg-white/85 overflow-hidden shadow-[0_20px_70px_-35px_rgba(15,23,42,0.4)]">
          <Box className="grid gap-6 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.35fr] lg:p-8">
            <AddTodo />
            <TodoList />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
