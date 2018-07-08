import React, { Fragment } from 'react';
import { RingLoader } from 'react-spinners';

const OrderBook = ({ type, loading, data }) => (
  <Fragment>
    <h4 className="orderBookType">
      <span className="bold">Live Order Book</span> - {type}
    </h4>
    <div className="orderColumns">
      <p>{type}</p>
      <p>Amount</p>
      <p>Exchange</p>
    </div>
    {loading ? (
      <div className="ringLoader">
        <RingLoader
          color={'#123ABC'}
          loading={true}
        />
      </div>
    ) : (
      <div className="bookBackground">
        {data.map((order, i) => (
          <div className="orderWrapper" key={i}>
            <p className={type.toLowerCase()}>{order.rate.toFixed(8)}</p>
            <p className="quantity">{order.quantity.toFixed(8)}</p>
            <p className="exchange">{order.exchange}</p>
          </div>
        ))}
      </div>
    )}
  </Fragment>
);

export default OrderBook;
