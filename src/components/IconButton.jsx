import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    minWidth: 0,
    minHeight: 0,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}))

const IconButton = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <Button variant="outlined" className={classes.iconButton} {...rest}>
      {children}
    </Button>
  )
}

IconButton.propTypes = {
  children: PropTypes.any,
}

export default IconButton
