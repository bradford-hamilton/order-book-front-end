import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Grid, Row, Col, Button, MenuItem, DropdownButton } from 'react-bootstrap';
import NavBar from './NavBar/NavBar';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient('http://localhost:4000'),
      response: null,
      loading: true,
      selected: 'BTC-ETH',
    };
  }

  componentDidMount() {
    this.state.socket.emit('marketPair', this.state.selected);
    this.state.socket.on('newData', data => {
      this.setState({
        response: data,
        loading: false,
      });
    });
  }

  send = (marketPair) => {
    this.state.socket.emit('marketPair', marketPair);
    this.setState({
      loading: true,
      selected: marketPair,
    });
  }

  render() {
    console.log(this.state.response);
    return (
      <div className="App">
        <NavBar />
        <Grid>
          <Row className="headerRow">
            <Col xs={12}>
              <h1>Welcome to the MasterBook</h1>
              <h4>May the odds be ever in your favour.</h4>
            </Col>
          </Row>
          <Row className="getStartedRow">
            <Col xs={12} md={6} mdOffset={3}>
              <DropdownButton
                bsStyle="primary"
                title="Select Market"
                id="dropdown-basic"
                onSelect={this.send}
              >
                <MenuItem
                  eventKey="BTC-ETH"
                  active={this.state.selected === 'BTC-ETH'}
                >
                  BTC-ETH
                </MenuItem>
                <MenuItem
                  eventKey="BTC-DOGE"
                  active={this.state.selected === 'BTC-DOGE'}
                >
                  BTC-DOGE
                </MenuItem>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="market">
              <h3>Selected Market: {this.state.selected}</h3>
            </Col>
          </Row>
          <Row className="orderBooks">
            <Col xs={12} md={6}>
              <div className="orderColumns">
                <p>Bid</p>
                <p>Amount</p>
                <p>Exchange</p>
              </div>
              {this.state.loading ? (
                <div>loading</div>
              ) : (
                <div className="bookBackground">
                  {this.state.response && (
                    this.state.response.allBids.map((bid, i) => (
                      <div className="orderWrapper" key={i}>
                        <p className="bid">{bid.rate.toFixed(8)}</p>
                        <p className="quantity">{bid.quantity.toFixed(8)}</p>
                        <p className="exchange">{bid.exchange}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Col>
            <Col xs={12} md={6}>
              <div className="orderColumns">
                <p>Ask</p>
                <p>Amount</p>
                <p>Exchange</p>
              </div>
              {this.state.loading ? (
                <div>loading</div>
              ) : (
                <div className="bookBackground">
                  {this.state.response && (
                    this.state.response.allAsks.map((ask, i) => (
                      <div className="orderWrapper" key={i}>
                        <p className="ask">{ask.rate.toFixed(8)}</p>
                        <p className="quantity">{ask.quantity.toFixed(8)}</p>
                        <p className="exchange">{ask.exchange}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
