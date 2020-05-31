import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'

import { usePreferences } from './preferences'

export const ThemeProvider = ({ children }) => {
  const context = usePreferences()

  if (!context) {
    throw new Error('ThemeProvider must be used within a PreferencesProvider')
  }

  const { darkMode } = context

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#CAC2A8' : '#836D4D',
        },
        text: {
          primary: darkMode ? '#CAC2A8' : '#836D4D',
        },
      },
      typography: {
        fontFamily: ['Roboto', 'Verdana', 'Arial', 'Helvetica', 'sans-serif'],
      },
    })
  }, [darkMode])

  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
}
