import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import stocksReducer from './stocksReducer'
import userReducer from './userReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
require('dotenv').config()

const rootReducer = combineReducers({
  user: userReducer, 
  stocks: stocksReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  
  document.getElementById('root', )
  )

serviceWorker.unregister()
