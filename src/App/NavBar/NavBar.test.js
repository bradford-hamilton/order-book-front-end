import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';

configure({ adapter: new Adapter() });

function setup() {
  const comp = shallow(<NavBar />);
  return { comp };
}

describe('<NavBar />', () => {
  it('renders without crashing', () => {
    const { comp } = setup();
    expect(comp).toBeDefined();
  });

  test('snapshot', () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
