import React, { Component } from 'react'
import { Segment, Grid, Header, Divider, Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Esg extends Component {

  ordinal_suffix_of = (i) => {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  render() {

    let stock = {}
    const { currentStock, showStock } = this.props
    if (showStock) {
      stock = showStock
    } else {
      stock = currentStock
    }

    return (
      <div style={{ width: '990px' }}>
        <Segment inverted>

          <div style={{ wordSpacing: '5px' }}>

            <Header inverted textAlign='left' >
              Environmental, Social, and Governance (ESG) Ratings <Popup
                trigger={<Icon color='grey' name='question circle outline' style={{ fontSize: '15px', marginTop: '-10px' }} />}
                content='Sustainalytics’ ESG Ratings measure how well companies proactively manage the environmental, social and governance issues that are the most material to their business and provide an assessment of companies’ ability to mitigate ESG risks. The ESG Rating is a quantitative score on a scale of 1-100, based on a balanced scorecard system.'
                position='top center'
                size='tiny'
              />
            </Header>

          </div>

          <Divider></Divider>

        <Grid centered columns={4}>
          <Grid.Row>
            <Grid.Column>
              <h5 style={{color: 'grey', marginBottom: '15px'}}>Total ESG score</h5>
              <span>
                <font size='7'>{stock.total_score}</font>
                  &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <font size='3' >{this.ordinal_suffix_of(stock.total_percentile)} percentile</font>
              </span>
            </Grid.Column>
            <Grid.Column>
                <h5 style={{ color: 'grey' }}>Environment</h5>
              <span>
                <font size='6'>{stock.e_score}</font>
                  &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <font size='3' >{this.ordinal_suffix_of(stock.e_percentile)} percentile</font>
              </span>
            </Grid.Column>
            <Grid.Column>
                <h5 style={{ color: 'grey' }}>Social</h5>
              <span>
                <font size='6'>{stock.s_score}</font>
                  &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <font size='3' >{this.ordinal_suffix_of(stock.s_percentile)} percentile</font>
              </span>
            </Grid.Column>
            <Grid.Column>
                <h5 style={{ color: 'grey' }}>Governance</h5>
              <span>
                <font size='6'>{stock.g_score}</font>
                  &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <font size='3' >{this.ordinal_suffix_of(stock.g_percentile)} percentile</font>
              </span>
            </Grid.Column>
           </Grid.Row>
        </Grid>
        
        </Segment>
      </div>
    )
  }
}

function msp(state) {
  return {
    currentStock: state.stocks.currentStock
  }
}

export default connect(msp)(Esg)