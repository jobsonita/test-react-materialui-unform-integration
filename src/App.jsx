import React from 'react'

import { AppProvider } from './context'

import Header from './layout/Header'

import Page from './pages/Page'

const App = () => (
  <AppProvider>
    <Header />
    <Page />
  </AppProvider>
)

export default App
