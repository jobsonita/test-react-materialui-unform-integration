import React, { useCallback, useRef } from 'react'

import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PageIcon from '@material-ui/icons/Person'

import * as Yup from 'yup'

import TextField from '../components/TextField'

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

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const classes = useStyles()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const formData = {
      email: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
      passwordConfirm: passwordConfirmRef.current.getValue(),
    }

    emailRef.current.setError('')
    passwordRef.current.setError('')
    passwordConfirmRef.current.setError('')

    try {
      await validation.validate(formData, { abortEarly: false })
      console.log('submitted: ', formData)
    } catch (error) {
      error.inner.forEach((err) => {
        switch (err.path) {
          case 'email':
            emailRef.current.setError(err.message)
            break
          case 'password':
            passwordRef.current.setError(err.message)
            break
          case 'passwordConfirm':
            passwordConfirmRef.current.setError(err.message)
            break
          default:
            console.log(err.message)
        }
      })
    }
  }, [])

  const handlePasswordChange = useCallback(() => {
    passwordConfirmRef.current.setError('')
  }, [])

  const handlePasswordConfirmChange = useCallback(() => {
    passwordRef.current.setError('')
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
                label="Email Address *"
                labelWidth={102}
                autoComplete="email"
                ref={emailRef}
              />
              <TextField
                required
                name="password"
                type="password"
                label="Password *"
                labelWidth={70}
                autoComplete="new-password"
                ref={passwordRef}
                onChange={handlePasswordChange}
              />
              <TextField
                required
                name="password-confirmation"
                type="password"
                label="Confirm Password *"
                labelWidth={130}
                autoComplete="new-password"
                ref={passwordConfirmRef}
                onChange={handlePasswordConfirmChange}
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
