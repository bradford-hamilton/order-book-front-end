import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from './App';

configure({ adapter: new Adapter() });

function setup() {
  const comp = shallow(<App />);

  return { comp };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const { comp } = setup();
    expect(comp).toBeDefined();
  });

  test('snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
