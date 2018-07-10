import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import OrderBook from './OrderBook';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    type: 'Bid',
    loading: false,
    data: [
      {
        rate: 3,
        quantity: 100,
        exchange: 'bittrex',
      },
      {
        rate: 3,
        quantity: 100,
        exchange: 'poloniex',
      },
      {
        rate: 3,
        quantity: 100,
        exchange: 'bittrex',
      },
    ],
  };
  const comp = shallow(<OrderBook {...props} />);

  return { comp, props };
}

describe('<OrderBook />', () => {
  it('renders without crashing', () => {
    const { comp } = setup();
    expect(comp).toBeDefined();
  });

  test('snapshot', () => {
    const { props } = setup();
    const tree = renderer.create(<OrderBook {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
