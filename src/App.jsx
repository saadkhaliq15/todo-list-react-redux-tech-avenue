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
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
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
    <Box className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <Box className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Box className="rounded-[28px] border border-slate-200/80 bg-white/85 px-6 py-5 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:px-8">
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', lg: 'center' }}
          >
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: 2.4, color: 'text.secondary' }}>
                Productivity dashboard
              </Typography>
              <Typography variant="h4" component="h1" fontWeight={800} sx={{ mt: 0.5 }}>
                Todo list
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
                Manage daily work with a clean workflow for adding, editing, completing, and removing tasks.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              <Chip label={`Total ${stats.total}`} variant="outlined" sx={{ fontWeight: 700 }} />
              <Chip label={`Done ${stats.completed}`} color="success" variant="outlined" sx={{ fontWeight: 700 }} />
              <Chip label={`Open ${stats.active}`} color="secondary" variant="outlined" sx={{ fontWeight: 700 }} />
            </Stack>
          </Stack>
        </Box>

        <Card className="overflow-hidden border border-slate-200/80 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.4)]">
          <CardContent className="p-0">
            <Box className="grid gap-6 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.35fr] lg:p-8">
              <Box className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <Typography variant="h6" fontWeight={800} color="text.primary">
                  Add task
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Create one task at a time for a focused workflow.
                </Typography>

                <Box component="form" onSubmit={handleAddTodo} className="space-y-4">
                  <TextField
                    label="Task title"
                    value={todoText}
                    onChange={(event) => setTodoText(event.target.value)}
                    fullWidth
                    placeholder="e.g. Finish the weekly report"
                  />
                  <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.3, fontWeight: 700 }}>
                    Add task
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Alert severity="info" variant="outlined" sx={{ alignItems: 'flex-start' }}>
                  Completed tasks are shown with a strikethrough and a muted label.
                </Alert>
              </Box>

              <Box className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={800} color="text.primary">
                      Tasks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toggle completion, edit inline, or delete an item.
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={2}>
                  {todos.length === 0 ? (
                    <Card variant="outlined" className="border-dashed border-slate-300 bg-slate-50">
                      <CardContent>
                        <Typography color="text.secondary">No tasks yet. Add your first one to get started.</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    todos.map((todo) => {
                      const isEditing = editingId === todo.id

                      return (
                        <Card
                          key={todo.id}
                          variant="outlined"
                          className="border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <CardContent sx={{ p: 2.25, '&:last-child': { pb: 2.25 } }}>
                            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                              <IconButton
                                onClick={() => dispatch(toggleTodo(todo.id))}
                                size="small"
                                color={todo.completed ? 'success' : 'default'}
                                sx={{ mt: 0.25 }}
                              >
                                {todo.completed ? (
                                  <CheckCircleOutlineRoundedIcon />
                                ) : (
                                  <RadioButtonUncheckedRoundedIcon />
                                )}
                              </IconButton>

                              <Box className="min-w-0 flex-1">
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                                  <Chip
                                    label={todo.completed ? 'Completed' : 'Open'}
                                    size="small"
                                    color={todo.completed ? 'success' : 'default'}
                                    variant="outlined"
                                    sx={{ height: 24, fontWeight: 700 }}
                                  />
                                </Stack>

                                {isEditing ? (
                                  <Stack spacing={1.5}>
                                    <TextField
                                      value={editingText}
                                      onChange={(event) => setEditingText(event.target.value)}
                                      fullWidth
                                      autoFocus
                                      label="Edit task"
                                    />
                                    <Stack direction="row" spacing={1}>
                                      <Button variant="contained" onClick={() => saveEdit(todo.id)} sx={{ fontWeight: 700 }}>
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
                                      fontWeight: 650,
                                      color: todo.completed ? 'text.secondary' : 'text.primary',
                                      textDecoration: todo.completed ? 'line-through' : 'none',
                                      textDecorationThickness: '2px',
                                    }}
                                  >
                                    {todo.text}
                                  </Typography>
                                )}
                              </Box>

                              <Stack direction="row" spacing={0.5} className="shrink-0">
                                {!isEditing && (
                                  <IconButton aria-label="edit todo" size="small" onClick={() => beginEdit(todo)}>
                                    <EditOutlinedIcon fontSize="small" />
                                  </IconButton>
                                )}
                                <IconButton
                                  aria-label="delete todo"
                                  size="small"
                                  color="error"
                                  onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                  <DeleteOutlineRoundedIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Stack>
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
