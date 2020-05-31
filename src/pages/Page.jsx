import React from 'react'

import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PageIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
  page: {
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.text.primary,
    width: 'auto',
    height: 'auto',
  },
  icon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  formWrapper: {
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
  form: {
    textAlign: 'center',
  },
  submit: {
    width: theme.spacing(20),
    marginTop: theme.spacing(2),
  },
}))

const Page = () => {
  const classes = useStyles()

  return (
    <Container className={classes.page}>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container component="main" spacing={1} className={classes.main}>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PageIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </Grid>
          <Grid item className={classes.formWrapper}>
            <form noValidate className={classes.form}>
              <TextField
                required
                name="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                required
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                required
                name="password-confirmation"
                type="password"
                label="Confirm Password"
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Page
