import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './auth-reducer'
import * as React from 'react'

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (values.password.length < 6) {
        errors.password = 'The minimal password length is 6'
      }

      return errors
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            width: '300px',
            margin: '0 auto',
            marginTop: '50px',
          }}
        >
          <div>
            <p style={{ marginBottom: '0' }}>
              To log in get registered{' '}
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'} rel="noreferrer">
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              Email: <b>free@samuraijs.com</b>
            </p>
            <p>
              Password: <b>free</b>
            </p>
          </div>

          <TextField
            variant="filled"
            label={formik.errors.email && formik.touched.email ? formik.errors.email : 'email'}
            color="secondary"
            autoComplete="off"
            error={!!formik.errors.email && formik.touched.email}
            {...formik.getFieldProps('email')}
          />
          <TextField
            variant="filled"
            label={formik.errors.password && formik.touched.password ? formik.errors.password : 'password'}
            error={!!formik.errors.password && formik.touched.password}
            color="secondary"
            type="password"
            {...formik.getFieldProps('password')}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" {...formik.getFieldProps('rememberMe')} />}
            label="Remember me"
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  )
}

// types
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
