import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Grid, Row, Col, MenuItem, DropdownButton } from 'react-bootstrap';
import { MARKETS } from './constants';
import OrderBook from './OrderBook/OrderBook';
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
    return (
      <div className="App">
        <NavBar />
        <Grid fluid>
          <Row className="headerRow">
            <Col xs={12}>
              <h1>Welcome to the MasterBook</h1>
              <h4>May the numbers be ever in your favour.</h4>
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
                {MARKETS.map(pair => (
                  <MenuItem
                    key={pair}
                    eventKey={pair}
                    active={this.state.selected === pair}
                  >
                    {pair}
                  </MenuItem>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="market">
              <h3>Selected Market: {this.state.selected}</h3>
            </Col>
          </Row>
          <Grid>
            <Row className="orderBooks">
              <Col xs={12} md={6}>
                <OrderBook
                  type="Bid"
                  loading={this.state.loading}
                  data={this.state.response && this.state.response.allBids}
                />
              </Col>
              <Col xs={12} md={6}>
                <OrderBook
                  type="Ask"
                  loading={this.state.loading}
                  data={this.state.response && this.state.response.allAsks}
                />
              </Col>
            </Row>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
