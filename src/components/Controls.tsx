import React from 'react';
import { SearchContext, SearchActions } from '../Context';

import Select from 'react-select';
import { Categories, Companies, Levels, Locations } from '../shared/Options';

import './Controls.scss';

type SelectOption = { label: string, value: string };
type ControlState = Record<'company' | 'category' | 'level' | 'location' | 'title', { label: string, value: string }[]>;

const asOptions = (list: string[]) => list.map(label => ({ label, value: label } as SelectOption));
const asValues = (list: SelectOption[] = []) => list.map(({ value }) => value);

const SelectFor = (list: string[], value: SelectOption[], onChange) => (
  <Select {...{
    // className: 'reactSelect-container',
    // classNamePrefix: 'reactSelect',
    menuPlacement: 'auto',
    // id: 'flairs',
    value,
    isSearchable: true,
    isClearable: true,
    hideSelectedOptions: true,
    isMulti: true,
    options: asOptions(list),
    onChange,
    // inputValue,
    // onInputChange,
  }} />
);

const useQueryState = () => {
  const [ state, dispatch ] = React.useReducer((state, action) => ({
    ...state,
    ...action
  }), {} as ControlState);
  return [ state, dispatch ] as [ ControlState, Function ]
};

const Test: React.FC<any> = () => {
  const { loading, performJobSearch } = React.useContext(SearchContext);

  const [ { company, category, level, location, title = '' }, setKeyValue ] = useQueryState();
  const updateKey = React.useCallback((key: string) => (selected: any) => {
    setKeyValue({ [key]: selected });
  }, [ setKeyValue ]);
  const doSearch = React.useCallback(() => {
    performJobSearch({
      company: asValues(company),
      category: asValues(category),
      level: asValues(level),
      location: asValues(location)
    });
  }, [ company, category, level, location, title ]);
  const companySelect = React.useMemo(() => (
    SelectFor(Companies, company || [], updateKey('company'))
  ), [ Companies, company ]);
  const categorySelect = React.useMemo(() => (
    SelectFor(Categories, category || [], updateKey('category'))
  ), [ Categories, category ]);
  const levelSelect = React.useMemo(() => (
    SelectFor(Levels, level || [], updateKey('level'))
  ), [ Levels, level ]);
  const locationSelect = React.useMemo(() => (
    SelectFor(Locations, location || [], updateKey('location'))
  ), [ Locations, location ]);

  return (
    <section className='controls-sidebar'>
      <label>
        <input type='text' placeholder='search' value={title} onChange={
          ({ target }) => setKeyValue({ title: target.value })
        } />
      </label>
      <button disabled={loading} onClick={doSearch}>Search</button>
      <fieldset>
        <legend>filters</legend>
        <label>
          company
          { companySelect }
        </label>
        <label>
          level
          { levelSelect }
        </label>
        <label>
          location
          { locationSelect }
        </label>
        <label>
          category
          { categorySelect }
        </label>
      </fieldset>
    </section>
  )
};

export default Test;
