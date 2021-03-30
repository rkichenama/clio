/* istanbul ignore file */
import React from 'react';
import { render } from 'react-dom';
import Search from './Search';

import './global.scss';

((d) => {
  const main = d.createElement('themuse');
  main.setAttribute('style', 'display: contents');
  d.body.appendChild(main);
  render(<Search />, main);
})(document);
