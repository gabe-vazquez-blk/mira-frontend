import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { setCurrentUser } from '../actions'

class LoginForm extends Component {

  state = {
    email: "",
    password: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    fetch(`${process.env.REACT_APP_BACKEND}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          console.log(this.props.setCurrentUser(response.user))
          this.props.routerprops.history.push('/stocks')
          localStorage.token = response.token
        }
      })
  }

  render() {

    const { email, password } = this.state

    return (
      <Route exact path="/login" render={() => {
        return (
          <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>

                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>

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

                    <Button color='green' fluid size='large'>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to MIRA? <Link to="/signup">Sign Up</Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )
      }} />)
  }
}

function msp(state) {
  return {
    currentUser: state.user.currentUser,
  }
}

export default connect(msp, { setCurrentUser })(LoginForm)