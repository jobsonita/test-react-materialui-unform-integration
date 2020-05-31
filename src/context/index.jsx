import React from 'react'
import PropTypes from 'prop-types'

import { PreferencesProvider } from './preferences'
import { ThemeProvider } from './theme'

export const AppProvider = ({ children }) => {
  return (
    <PreferencesProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </PreferencesProvider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.any,
}
