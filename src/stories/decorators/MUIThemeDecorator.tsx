import React from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../index'

export const MUIThemeDecorator = (storyFn: () => React.ReactNode) => {
  return (
      <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  )
}
