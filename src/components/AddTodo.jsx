import { useState } from 'react'
import { Alert, Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice'

function AddTodo() {
  const dispatch = useDispatch()
  const [todoText, setTodoText] = useState('')

  const handleAddTodo = (event) => {
    event.preventDefault()

    if (!todoText.trim()) {
      return
    }

    dispatch(addTodo(todoText))
    setTodoText('')
  }

  return (
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
  )
}

export default AddTodo
