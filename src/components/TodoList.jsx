import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

function TodoList() {
  const todos = useSelector((state) => state.todos)

  return (
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
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </Stack>
    </Box>
  )
}

export default TodoList
