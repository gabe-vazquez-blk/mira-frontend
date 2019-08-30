import React, { Component } from 'react'
import { Segment, List, Icon, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFilter } from '../actions'

class StockFilterBar extends Component {

  handleClick = (e)=>{
    const { setFilter, filter } = this.props
    const newFilter = e.target.dataset.filter
    if(newFilter === filter){
      setFilter('')
    } else {
      setFilter(newFilter)
    }
  }

  render() {
    return (
      <div>
        <Segment floated='left' inverted style={{width: '180px'}}>
          {/* <SearchBar /> */}
          <List>
            <List.Header as='h4'>Sort:</List.Header>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Environmental 
                    </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Icon inverted name='arrow alternate circle up outline' data-filter='e-up' onClick={this.handleClick} />
                  <Icon inverted name='arrow alternate circle down outline' data-filter='e-down' onClick={this.handleClick} />
                </Grid.Column>
              </Grid>
            </List.Item>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Social
                    </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Icon inverted name='arrow alternate circle up outline' data-filter='s-up' onClick={this.handleClick}/>
                  <Icon inverted name='arrow alternate circle down outline' data-filter='s-down' onClick={this.handleClick}/>
                </Grid.Column>
              </Grid>
            </List.Item>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Governance
                    </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Icon inverted name='arrow alternate circle up outline' data-filter='g-up' onClick={this.handleClick}/>
                  <Icon inverted name='arrow alternate circle down outline' data-filter='g-down' onClick={this.handleClick}/>
                </Grid.Column>
              </Grid>
            </List.Item>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Total ESG
                    </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Icon inverted name='arrow alternate circle up outline' data-filter='total-up' onClick={this.handleClick}/>
                  <Icon inverted name='arrow alternate circle down outline' data-filter='total-down' onClick={this.handleClick}/>
                </Grid.Column>
              </Grid>
            </List.Item>
          </List>

          {/* <List>
            <List.Header as='h4'>Sector:</List.Header>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Tech
                    </Grid.Column>
                <Grid.Column>
                  <Checkbox />
                </Grid.Column>
              </Grid>
            </List.Item>
            <List.Item>
              <Grid columns={2}>
                <Grid.Column>
                  Finance
                    </Grid.Column>
                <Grid.Column>
                  <Checkbox />
                </Grid.Column>
              </Grid>
            </List.Item>
          </List> */}
        </Segment>
      </div>
    )
  }
}

function msp(state) {
  return {
    filter: state.stocks.filter,
  }
}

export default connect(msp, { setFilter })(StockFilterBar)