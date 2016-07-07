import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import CarsIndex from './containers/cars-index';


export default (
    <Route path='/' component={App}>
    	<IndexRoute component={CarsIndex} />
    </Route>
);
