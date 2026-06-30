import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, toggleTodo } from './features/todos/todosSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const [todoText, setTodoText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const stats = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length
    return {
      total: todos.length,
      completed: completedCount,
      active: todos.length - completedCount,
    }
  }, [todos])

  const handleAddTodo = (event) => {
    event.preventDefault()

    if (!todoText.trim()) {
      return
    }

    dispatch(addTodo(todoText))
    setTodoText('')
  }

  const beginEdit = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const saveEdit = (todoId) => {
    if (!editingText.trim()) {
      return
    }

    dispatch(editTodo({ id: todoId, text: editingText }))
    setEditingId(null)
    setEditingText('')
  }

  return (
    <Box className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <Box className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Card className="overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/70">
          <CardContent className="p-0">
            <Box className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-6 py-8 text-white sm:px-8">
              <Stack spacing={2}>
                <Chip
                  label="React + Redux Todo App"
                  sx={{ width: 'fit-content', bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }}
                />
                <Box>
                  <Typography variant="h4" component="h1" fontWeight={800}>
                    Stay organized with a simple, responsive todo board
                  </Typography>
                  <Typography sx={{ mt: 1, maxWidth: 720, color: 'rgba(255,255,255,0.9)' }}>
                    Add tasks, edit them inline, delete what is done, and keep track of total and completed items.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Chip label={`Total: ${stats.total}`} sx={{ bgcolor: 'white', color: '#0f172a' }} />
                  <Chip label={`Completed: ${stats.completed}`} sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }} />
                  <Chip label={`Active: ${stats.active}`} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
                </Stack>
              </Stack>
            </Box>

            <Box className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
              <Box className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Add a todo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Use the input below to create a new task.
                </Typography>

                <Box component="form" onSubmit={handleAddTodo} className="space-y-4">
                  <TextField
                    label="Todo title"
                    value={todoText}
                    onChange={(event) => setTodoText(event.target.value)}
                    fullWidth
                    placeholder="e.g. Finish design review"
                  />
                  <Button type="submit" variant="contained" size="large" fullWidth>
                    Add Todo
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Alert severity="info" variant="outlined">
                  Completed todos automatically use a strikethrough style.
                </Alert>
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                      Todo list
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage each item with toggle, edit, and delete actions.
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={2}>
                  {todos.length === 0 ? (
                    <Card variant="outlined" className="border-dashed border-slate-300 bg-white">
                      <CardContent>
                        <Typography color="text.secondary">
                          No todos yet. Add your first task to get started.
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    todos.map((todo) => {
                      const isEditing = editingId === todo.id

                      return (
                        <Card
                          key={todo.id}
                          variant="outlined"
                          className="border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <CardContent className="!pb-4">
                            <Box className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <Checkbox
                                checked={todo.completed}
                                onChange={() => dispatch(toggleTodo(todo.id))}
                                sx={{ mt: -0.5 }}
                              />

                              <Box className="min-w-0 flex-1">
                                <Typography
                                  variant="overline"
                                  color="text.secondary"
                                  sx={{ letterSpacing: 1.2 }}
                                >
                                  Todo item
                                </Typography>

                                {isEditing ? (
                                  <Stack spacing={1.5}>
                                    <TextField
                                      value={editingText}
                                      onChange={(event) => setEditingText(event.target.value)}
                                      fullWidth
                                      autoFocus
                                      label="Edit todo"
                                    />
                                    <Stack direction="row" spacing={1}>
                                      <Button variant="contained" onClick={() => saveEdit(todo.id)}>
                                        Save
                                      </Button>
                                      <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={() => {
                                          setEditingId(null)
                                          setEditingText('')
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </Stack>
                                  </Stack>
                                ) : (
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: 600,
                                      color: todo.completed ? 'text.secondary' : 'text.primary',
                                      textDecoration: todo.completed ? 'line-through' : 'none',
                                      textDecorationThickness: '2px',
                                    }}
                                  >
                                    {todo.text}
                                  </Typography>
                                )}
                              </Box>

                              <Stack direction="row" spacing={1} className="shrink-0">
                                {!isEditing && (
                                  <Button variant="outlined" size="small" onClick={() => beginEdit(todo)}>
                                    Edit
                                  </Button>
                                )}
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                  Delete
                                </Button>
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default App
