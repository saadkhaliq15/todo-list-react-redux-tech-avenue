import { Box, Button, Card, CardContent, Chip, IconButton, Stack, TextField, Typography } from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import { useDispatch } from 'react-redux'
import { toggleTodo, editTodo, deleteTodo } from '../features/todos/todosSlice'
import { useState } from 'react'

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editingText, setEditingText] = useState(todo.text)

  const beginEdit = () => {
    setIsEditing(true)
    setEditingText(todo.text)
  }

  const saveEdit = () => {
    if (!editingText.trim()) {
      return
    }

    dispatch(editTodo({ id: todo.id, text: editingText }))
    setIsEditing(false)
  }

  return (
    <Card
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
                  <Button variant="contained" onClick={saveEdit} sx={{ fontWeight: 700 }}>
                    Save
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                      setIsEditing(false)
                      setEditingText(todo.text)
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
              <IconButton aria-label="edit todo" size="small" onClick={beginEdit}>
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
}

export default TodoItem
