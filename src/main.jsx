import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f172a',
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#5b6475',
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: '"Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
