import React, { useEffect, useRef, useState } from 'react'
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

const TextField = ({ name, label, ...rest }) => {
  counter += 1
  console.log('textfield rerenders', counter)

  const [id] = useState(uniqueId('textfield-'))

  const inputRef = useRef()

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <FormControl error={!!error} fullWidth margin="dense" variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        defaultValue={defaultValue}
        inputRef={inputRef}
        {...rest}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default TextField
