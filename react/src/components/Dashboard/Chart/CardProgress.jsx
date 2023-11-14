import { Box, Typography } from '@mui/material'
import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

function CardProgress({valeur, couleur, titre}) {
     
  return (
    <Box marginX="auto" paddingX={2} marginTop={2} borderBottom="1px solid grey" width="90%"  height="100px" >
        <Typography variant="h5" sx={{marginY:3}}>{titre}</Typography>
        <LinearProgress variant="determinate" color={couleur} value={valeur}/>
    </Box>
  )
}

export default CardProgress
