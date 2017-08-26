import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './helper/compatibility.js';
import './helper/easterEgg.js';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-josefin-sans';

import './css/main.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();