import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

import './styles/index.scss';

render(<Root />, document.getElementById('root'));

if (module.hot) module.hot.accept();
