import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { setCurrentUser } from '../actions'

class SignUpForm extends Component {
  
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, confirmPassword } = this.state

    if (password === confirmPassword) {
      fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })
        .then(resp => resp.json())
        .then((response) => {
          this.props.setCurrentUser(response.user)
          this.props.routerprops.history.push('/stocks')
          localStorage.token = response.token
        })
    }
  }

  createUser = ()=>{
    fetch(`localhost/3000/users`)
  }
  
  render() {
    const { firstName, lastName, email, password, confirmPassword } = this.state

    return (
        <Route exact path="/signup" render={() => {
          return (
            <div>
              <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>

                  <Form size='large' onSubmit={(e)=>this.handleSubmit(e)}>
                    <Segment stacked>

                      <Form.Input
                        fluid icon='user'
                        iconPosition='left'
                        placeholder='First Name'
                        name='firstName'
                        value={firstName}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid icon='user'
                        iconPosition='left'
                        placeholder='Last Name'
                        name='lastName'
                        value={lastName}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid icon='mail'
                        iconPosition='left'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                      />

                      <Button color='green' fluid size='large'>
                        Sign Up
                    </Button>
                    </Segment>
                  </Form>
                  <Message>
                    Already a user? <Link to="/login">Login</Link> 
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }}/>)
  }  
}

function msp(state) {
  return {
    currentUser: state.user.currentUser,
  }
}

export default connect(msp, { setCurrentUser })(SignUpForm)