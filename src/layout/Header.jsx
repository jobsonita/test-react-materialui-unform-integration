import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LightBulbIcon from '@material-ui/icons/EmojiObjectsOutlined'
import IconOff from '@material-ui/icons/ToggleOff'
import IconOn from '@material-ui/icons/ToggleOn'

import IconButton from '../components/IconButton'

import { usePreferences } from '../context/preferences'

const useStyles = makeStyles((theme) => ({
  header: {
    border: 'solid 1px',
    borderColor: theme.palette.text.primary,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
}))

const Header = () => {
  const { darkMode, toggleDarkMode } = usePreferences()

  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Grid container>
        <Grid
          item
          xs={9}
          container
          alignItems="center"
          justify="flex-start"
          spacing={1}
        >
          <Grid item>
            <Typography component="span" variant="h5">
              Test
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          alignItems="center"
          justify="flex-end"
          spacing={1}
        >
          <Grid item>
            <LightBulbIcon color="primary" />
          </Grid>
          <Grid item>
            <IconButton onClick={toggleDarkMode} color="primary">
              {darkMode ? <IconOff /> : <IconOn />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header
