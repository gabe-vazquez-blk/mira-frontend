import React, { Component, Fragment } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions'
import SearchBar from './SearchBar';

class Navbar extends Component {
  state = { activeItem: 'MIRA' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if(name === 'logout'){
      this.logout()
    }
  }

  logout = ()=>{
    this.props.setCurrentUser(null)
    localStorage.removeItem('token')
  }
  
  render() {

    const { activeItem } = this.state
    const { currentUser } = this.props

    return (
      <div style={{position: 'fixed', width: '100%', zIndex: 2, backgroundColor: 'black'}}>
        <Menu inverted secondary>
          <Menu.Item 
            name='MIRA' 
            active={activeItem === 'MIRA'} 
            onClick={this.handleItemClick}
            style={{ lineHeight: '2.5' }}
            href='/stocks'
          />
          {!currentUser
            ? <Fragment>
                <Menu.Item 
                  name='watchlist' 
                  active={activeItem === 'watchlist'} 
                  position='right' 
                  onClick={this.handleItemClick}
                  href='watchlist'
                />
                <Menu.Item 
                  name='login' 
                  active={activeItem === 'login'} 
                  onClick={this.handleItemClick}
                  href='/login'
                />
                <Menu.Item 
                  name='sign up' 
                  active={activeItem === 'sign up'} 
                  onClick={this.handleItemClick}
                  href='/signup'
                />
              </Fragment>
          : 
          <Fragment>
            <Menu.Item position='right'>
              <SearchBar routerprops={this.props}/>
            </Menu.Item>
            <Menu.Item 
              name='watchlist' 
              active={activeItem === 'watchlist'} 
              position='right' 
              onClick={this.handleItemClick}
              style={{ lineHeight: '2.5' }}
              href='/watchlist'
            />
            <Menu.Item 
              name='logout' 
              active={activeItem === 'logout'} 
              onClick={this.handleItemClick} 
              style={{lineHeight: '2.5'}}
              href='/'
            />
          </Fragment>}
        </Menu>
      </div>
    );
  }
}

function msp(state) {
  return {
    currentUser: state.user.currentUser,
  }
}

export default connect(msp, { setCurrentUser })(Navbar)