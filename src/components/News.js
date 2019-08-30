import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import { getNews } from '../actions'

class News extends Component {

  renderHeadlines = ()=>{
    return this.props.news.map(article => { 
      return <List.Item>{article.headline}</List.Item> 
    })
  }

  render() {

    return (
      <List selection divided inverted relaxed>
        {this.renderHeadlines()}
      </List>
    )
  }
}

function msp(state) {
  return {
    watchlist: state.stocks.watchlist,
    news: state.stocks.news,
  }
}

export default connect(msp, { getNews })(News)