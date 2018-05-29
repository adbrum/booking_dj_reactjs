import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios";
// import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css'

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
