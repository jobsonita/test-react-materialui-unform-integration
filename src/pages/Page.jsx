import React, { useCallback, useRef } from 'react'

import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
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

  const emailFieldRef = useRef()
  const emailInputRef = useRef()
  const emailErrorRef = useRef()

  const passwordFieldRef = useRef()
  const passwordInputRef = useRef()
  const passwordErrorRef = useRef()

  const passwordConfirmFieldRef = useRef()
  const passwordConfirmInputRef = useRef()
  const passwordConfirmErrorRef = useRef()

  const classes = useStyles()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const formData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      passwordConfirm: passwordConfirmInputRef.current.value,
    }

    if (emailErrorRef.current.innerHTML) {
      emailFieldRef.current.classList.remove('Mui-error')
      emailErrorRef.current.innerHTML = ''
    }
    if (passwordErrorRef.current.innerHTML) {
      passwordFieldRef.current.classList.remove('Mui-error')
      passwordErrorRef.current.innerHTML = ''
    }
    if (passwordConfirmErrorRef.current.innerHTML) {
      passwordConfirmFieldRef.current.classList.remove('Mui-error')
      passwordConfirmErrorRef.current.innerHTML = ''
    }

    try {
      await validation.validate(formData, { abortEarly: false })
      console.log('submitted: ', formData)
    } catch (error) {
      error.inner.forEach((err) => {
        switch (err.path) {
          case 'email':
            if (!emailErrorRef.current.innerHTML) {
              emailFieldRef.current.classList.add('Mui-error')
            }
            emailErrorRef.current.innerHTML = err.message
            break
          case 'password':
            if (!passwordErrorRef.current.innerHTML) {
              passwordFieldRef.current.classList.add('Mui-error')
            }
            passwordErrorRef.current.innerHTML = err.message
            break
          case 'passwordConfirm':
            if (!passwordConfirmErrorRef.current.innerHTML) {
              passwordConfirmFieldRef.current.classList.add('Mui-error')
            }
            passwordConfirmErrorRef.current.innerHTML = err.message
            break
          default:
            console.log(err.message)
        }
      })
    }
  }, [])

  const handleEmailChange = useCallback(() => {
    if (emailErrorRef.current.innerHTML) {
      emailFieldRef.current.classList.remove('Mui-error')
      emailErrorRef.current.innerHTML = ''
    }
  }, [])

  const handlePasswordChange = useCallback(() => {
    if (passwordErrorRef.current.innerHTML) {
      passwordFieldRef.current.classList.remove('Mui-error')
      passwordErrorRef.current.innerHTML = ''
    }
    if (passwordConfirmErrorRef.current.innerHTML) {
      passwordConfirmFieldRef.current.classList.remove('Mui-error')
      passwordConfirmErrorRef.current.innerHTML = ''
    }
  }, [])

  const handlePasswordConfirmChange = useCallback(() => {
    if (passwordErrorRef.current.innerHTML) {
      passwordFieldRef.current.classList.remove('Mui-error')
      passwordErrorRef.current.innerHTML = ''
    }
    if (passwordConfirmErrorRef.current.innerHTML) {
      passwordConfirmFieldRef.current.classList.remove('Mui-error')
      passwordConfirmErrorRef.current.innerHTML = ''
    }
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
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <OutlinedInput
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  ref={emailFieldRef}
                  inputRef={emailInputRef}
                />
                <FormHelperText ref={emailErrorRef} error />
              </FormControl>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  ref={passwordFieldRef}
                  inputRef={passwordInputRef}
                />
                <FormHelperText ref={passwordErrorRef} error />
              </FormControl>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel htmlFor="password-confirmation">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  onChange={handlePasswordConfirmChange}
                  ref={passwordConfirmFieldRef}
                  inputRef={passwordConfirmInputRef}
                />
                <FormHelperText ref={passwordConfirmErrorRef} error />
              </FormControl>
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
