require('./style/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise';

import routes from './routes';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(
    reduxPromise
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.querySelector('.container.app')
);
