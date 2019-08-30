import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'

class Home extends Component {
  
  render() {

  return(
    <Route exact path = "/" render = {() => { 

      return (
        <div className='home'>
          <font size={10}>MIRA</font>
          <br></br>
          <font size={4} style={{fontStyle: 'italic'}}>A deeper look into your investments.</font>
          <br></br>
          <Link to="/signup"><Button inverted>Get Started ></Button></Link>
        </div>
      )
    }} />
  )

  }
}

export default Home;