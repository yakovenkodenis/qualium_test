import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/app';
import CarsIndex from './containers/cars-index';
import CarNew from './containers/car-new';
import CarShow from './containers/car-show';
import CarEdit from './containers/car-edit';
import SignIn from './containers/signin';
import auth from './auth/auth';


function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/authenticate',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function filterLoggedIn(nextState, replace) {
    if (auth.loggedIn()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

export default (
    <Route path='/' component={App}>
        <IndexRoute component={CarsIndex} onEnter={requireAuth} />
        <Route path='cars/new' component={CarNew} onEnter={requireAuth} />
        <Route path='cars/:id' component={CarShow} onEnter={requireAuth} />
        <Route path='cars/edit/:id' component={CarEdit} onEnter={requireAuth} />
        <Route path='authenticate' component={SignIn} onEnter={filterLoggedIn} />
        <Redirect from='*' to='/' />
    </Route>
);