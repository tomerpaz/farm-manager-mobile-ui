import { Box } from '@mui/material'
import React from 'react'
import { PRIMARY_MAIN } from '../../App'

const DecoratedBox = ({value, error}) => {
  return (
    <Box border={2} marginLeft={1} marginRight={1} padding={0.5} borderRadius={1} borderColor={error ? 'red' : PRIMARY_MAIN} color={error ? 'red' : PRIMARY_MAIN} fontWeight={'bold'}>{value}</Box>
  )
}

export default DecoratedBox