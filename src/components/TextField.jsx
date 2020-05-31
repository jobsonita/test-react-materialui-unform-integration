import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'

import { uniqueId } from 'lodash/util'

let counter = 0

const TextField = forwardRef(function TextField(
  { label, onChange, ...rest },
  ref
) {
  counter += 1
  console.log('textfield rerenders', counter)

  const [id] = useState(uniqueId('textfield-'))

  const fieldRef = useRef()
  const inputRef = useRef()
  const errorRef = useRef()

  const getValue = useCallback(() => {
    return inputRef.current.value
  }, [])

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

  useImperativeHandle(ref, () => ({
    getValue,
    setError,
  }))

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
        ref={fieldRef}
        inputRef={inputRef}
        onChange={handleChange}
        {...rest}
      />
      <FormHelperText ref={errorRef} error />
    </FormControl>
  )
})

TextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextField
