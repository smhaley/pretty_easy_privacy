import React, { Component, useState } from 'react'
import NavBar from './components/NavBar'
import TextInput from './components/TextInput'
import Box from '@material-ui/core/Box'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  test: {
    backgroundColor: 'purple',
   
  }
}));


const App = () => {
  const classes = useStyles();

  const [inLineAes, setinLineAes] = useState();

  let inLineAesSubmit = (e) => {
    e.preventDefault()
    console.log('text')
  }

  return (
    <div >
    <NavBar/>
  
    <Container className={classes.root}>
       {/* <Box className={classes.test}>kmkk</Box> */}
      <TextInput
      inLineAesSubmit = {inLineAesSubmit}/>
    </Container>
  </div>
  )


      
}



export default App