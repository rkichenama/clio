import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';

describe('Search', () => {
  it('renders', () => {
    expect(shallow(<Search />)).toMatchSnapshot();
  });
});