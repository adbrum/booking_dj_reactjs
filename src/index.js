import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import axios from "axios";
import reducer from './reducers/index'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import MuiThemeProvider from './@material-ui/core/styles/MuiThemeProvider';


let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, logger))

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

ReactDOM.render(
    <MuiThemeProvider >
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
