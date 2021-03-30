import React from 'react';
import SearchProvider from './Context';
import Controls from './components/Controls';
import Results from './components/Results';

export default function Search () {
  return (
    <SearchProvider>
      <Results />
      <Controls />
    </SearchProvider>
  )
}