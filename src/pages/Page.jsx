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

import { Form } from '@unform/web'

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
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

let counter = 0

const Page = () => {
  counter += 1
  console.log('passes: ', counter)

  const formRef = useRef()

  const classes = useStyles()

  const handleSubmit = useCallback(async (formData) => {
    formRef.current.setErrors({})

    try {
      await validation.validate(formData, { abortEarly: false })
      console.log('submitted: ', formData)
    } catch (error) {
      const errors = {}

      error.inner.forEach((err) => {
        errors[err.path] = err.message
      })

      formRef.current.setErrors(errors)
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
            <Form
              noValidate
              ref={formRef}
              onSubmit={handleSubmit}
              className={classes.form}
            >
              <TextField
                required
                name="email"
                type="email"
                label="Email Address *"
                labelWidth={102}
                autoComplete="email"
              />
              <TextField
                required
                name="password"
                type="password"
                label="Password *"
                labelWidth={70}
                autoComplete="new-password"
              />
              <TextField
                required
                name="password_confirmation"
                type="password"
                label="Confirm Password *"
                labelWidth={130}
                autoComplete="new-password"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Page
