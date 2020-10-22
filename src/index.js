import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();