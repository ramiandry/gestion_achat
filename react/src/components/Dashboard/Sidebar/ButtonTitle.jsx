import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function ButtonTitle({titre, content}) {
  return (
    <>
        <Typography marginTop={2} variant='subtitle2'>{titre}</Typography>
        <Box marginY={1}>
            {content}
        </Box>
        <Divider></Divider>
    </>
  )
}

export default ButtonTitle
