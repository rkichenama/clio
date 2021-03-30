/* istanbul ignore file */
import React from 'react';
import { pascalize } from 'humps';
import client from './client';

export type SearchContextValue = {
  loading: boolean,
  loaded: boolean,
  error?: any,
  data: Job[],
  performJobSearch: Function
}
type Action = {
  type: string,
  payload?: any
}

const Mutations = {
  jobSearchStart: (state: SearchContextValue) => ({
    ...state,
    loading: true,
    loaded: false,
    error: false,
    data: []
  }),
  jobSearchSuccess: (state: SearchContextValue, action: Action) => ({
    ...state,
    loading: false,
    loaded: true,
    error: false,
    data: (action.payload as ApiSuccess)
  }),
  jobSearchFail: (state: SearchContextValue, action: Action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.payload,
    data: []
  })
};
const AllowableActions = Object.keys(Mutations);

export const SearchActions = AllowableActions
  .reduce((dict, key) => ({
    ...dict,
    [pascalize(key)]: key
  }), {} as Record<string, string>);

export const reducer = (state, action) => {
  if (AllowableActions.includes(action.type)) {
    return Mutations[action.type](state, action);
  }
  return state;
};

const initializer = () => ({
  loaded: false, loading: false, data: []
});

export const SearchContext = React.createContext({} as SearchContextValue);

const SearchProvider: React.FC<any> = ({ children }) => {
  const [ value, dispatch ] = React.useReducer(reducer, {}, initializer);
  const performJobSearch = React.useCallback((query: Query, title?: string) => {
    dispatch({ type: SearchActions.JobSearchStart });
    client({
      ...query,
      page: 1
    }).then(
      ({ data }) => {
        if (title) {
          const regex = new RegExp(title, 'i');
          dispatch({
            type: SearchActions.JobSearchSuccess,
            payload: data.results.filter(({ name }) => regex.test(name))
          });
        } else {
          dispatch({ type: SearchActions.JobSearchSuccess, payload: data.results });
        }
      },
      (err) => {
        dispatch({ type: SearchActions.JobSearchFail, payload: err })
      }
    );
  }, [ dispatch ]);

  return (
    <SearchContext.Provider value={{ ...value, dispatch, performJobSearch } as SearchContextValue}>
      { children }
    </SearchContext.Provider>
  )
};

export default SearchProvider;
