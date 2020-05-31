import React, { useCallback, useState } from 'react'

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

import * as Yup from 'yup'

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

const validation = Yup.object({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

let counter = 0

const Page = () => {
  counter += 1
  console.log('passes: ', counter)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')

  const classes = useStyles()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      setEmailError('')
      setPasswordError('')
      setPasswordConfirmError('')

      const formData = {
        email,
        password,
        passwordConfirm,
      }

      try {
        await validation.validate(formData, { abortEarly: false })
        console.log('submitted: ', formData)
      } catch (error) {
        error.inner.forEach((err) => {
          switch (err.path) {
            case 'email':
              setEmailError(err.message)
              break
            case 'password':
              setPasswordError(err.message)
              break
            case 'passwordConfirm':
              setPasswordConfirmError(err.message)
              break
            default:
              console.log(err.message)
          }
        })
      }
    },
    [email, password, passwordConfirm]
  )

  const handleEmailChange = useCallback((e) => {
    setEmailError('')
    setEmail(e.target.value)
  }, [])

  const handlePasswordChange = useCallback((e) => {
    setPasswordError('')
    setPasswordConfirmError('')
    setPassword(e.target.value)
  }, [])

  const handlePasswordConfirmChange = useCallback((e) => {
    setPasswordError('')
    setPasswordConfirmError('')
    setPasswordConfirm(e.target.value)
  }, [])

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
            <form noValidate onSubmit={handleSubmit} className={classes.form}>
              <TextField
                required
                name="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
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
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
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
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                error={!!passwordConfirmError}
                helperText={passwordConfirmError}
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
