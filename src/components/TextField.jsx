import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'

import { useField } from '@unform/core'

import { uniqueId } from 'lodash/util'

let counter = 0

const TextField = ({ name, label, onChange, ...rest }) => {
  counter += 1
  console.log('textfield rerenders', counter)

  const [id] = useState(uniqueId('textfield-'))

  const fieldRef = useRef()
  const inputRef = useRef()
  const errorRef = useRef()

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  const setError = useCallback(
    (error) => {
      if (error) {
        if (!errorRef.current.innerHTML) {
          fieldRef.current.classList.add('Mui-error')
        }
        errorRef.current.innerHTML = error
      } else {
        if (errorRef.current.innerHTML) {
          fieldRef.current.classList.remove('Mui-error')
          errorRef.current.innerHTML = ''
        }
      }
    },
    [errorRef, fieldRef]
  )

  useEffect(() => {
    setError(error)
  }, [error, setError])

  const handleChange = useCallback(
    (e) => {
      setError('')
      if (onChange) {
        onChange(e)
      }
    },
    [onChange, setError]
  )

  return (
    <FormControl fullWidth margin="dense" variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        defaultValue={defaultValue}
        ref={fieldRef}
        inputRef={inputRef}
        onChange={handleChange}
        {...rest}
      />
      <FormHelperText ref={errorRef} error />
    </FormControl>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextField
