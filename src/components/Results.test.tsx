import React from 'react';
import { shallow, mount } from 'enzyme';
import Results, { Result } from './Results';
import { createMock } from 'ts-auto-mock';

jest.mock('../shared/domparse.ts')

describe('Result', () => {
  let job: Job;

  beforeEach(() => {
    job = createMock<Job>();
  });

  it('should render', () => {
    expect(shallow(<Result {...job} />)).toMatchSnapshot();
  });
});

describe('Results', () => {
  let job: Job;
  let useContextSpy;

  beforeAll(() => {
    useContextSpy = jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        loading: false, loaded: true, data: []
      }));
  })
  beforeEach(() => {
    job = createMock<Job>();
    useContextSpy.mockClear();
  });

  it('should render', () => {
    useContextSpy.mockImplementationOnce(() => ({
      loading: false, loaded: true, data: [ job ]
    }));
    expect(shallow(<Results />)).toMatchSnapshot();
  });
});
