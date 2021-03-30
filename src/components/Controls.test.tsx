import React from 'react';
import { mount } from 'enzyme';
import Controls from './Controls';

describe('Controls', () => {
  it('render as expected', () => {
    expect(mount(<Controls />)).toMatchSnapshot();
  });
});
