import { reducer, SearchActions, SearchContextValue } from './Context';
import { createMock } from 'ts-auto-mock';

describe('Context', () => {
  describe('reducer', () => {
    const state: SearchContextValue = {
      loading: false,
      loaded: false,
      error: false,
      data: [],
      performJobSearch: jest.fn()
    };
    const job = createMock<Job>();

    it('initiates an async job search', () => {
      expect(reducer(state, { type: SearchActions.JobSearchStart })).toMatchObject({
        loading: true,
        loaded: false,
        error: false,
        data: []
      });
    });

    it('recieves an async job search success', () => {
      expect(reducer(state, { type: SearchActions.JobSearchSuccess, payload: [ job ] })).toMatchObject({
        loading: false,
        loaded: true,
        error: false,
        data: [ job ]
      });
    });

    it('recieves an async job search failure', () => {
      expect(reducer(state, { type: SearchActions.JobSearchFail, payload: { error: true } })).toMatchObject({
        loading: false,
        loaded: false,
        error: { error: true },
        data: []
      });
    });
  });
});