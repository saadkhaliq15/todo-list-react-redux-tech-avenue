import { Box, Chip, Stack, Typography } from '@mui/material'

function Header({ stats }) {
  return (
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
  )
}

export default Header
