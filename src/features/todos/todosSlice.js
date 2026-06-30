import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: nanoid(),
    text: 'Plan the week ahead',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'Review project milestones',
    completed: true,
  },
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.unshift(action.payload)
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            completed: false,
          },
        }
      },
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo(state, action) {
      const todo = state.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    editTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.find((item) => item.id === id)
      if (todo) {
        todo.text = text.trim()
      }
    },
  },
})

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todosSlice.actions
export default todosSlice.reducer
