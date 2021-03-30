import React from 'react';
import { SearchContext } from '../Context';
import firstNChars from '../shared/domparse';

import './Results.scss';

type ResultType = Pick<Job, 'company' | 'name' | 'locations' | 'contents'>;
const Result: React.FC<ResultType> = ({
  company, contents, locations, name, refs: { landingPage }
}) => {
  const [ expanded, toggleExpanded ] = React.useState(false);

  return (
    <article className='result'>
      <div>
        <a href={landingPage} target='_blank' rel='noopener'>{ name }</a>
      </div>
      <div>{ company.name }</div>
      <div className='flexible-container'>{ locations.map(({ name }, idx) => (
        <span key={`${idx}-${name}`}>{ name }</span>
      )) }</div>
      <section>
        <button onClick={() => toggleExpanded(open => !open)}>
          { expanded ? 'less' : 'more' }
        </button>
        <div className={ expanded ? 'open' : 'closed' } dangerouslySetInnerHTML={{__html: expanded ? contents : firstNChars(contents) }} />
      </section>
    </article>
  );
}

const Results: React.FC<any> = () => {
  const { loading, loaded, data, error } = React.useContext(SearchContext);

  return (
    <section className='results'>
      { error
        ? ('An error occurred')
        : loading && !loaded
          ? ('Loading...')
          : !loading && !loaded
            ? ('please try doing a search')
            : data.map(job => (
              <Result key={job.id} {...job} />
            ))
      }
    </section>
  );
};

export default Results;
