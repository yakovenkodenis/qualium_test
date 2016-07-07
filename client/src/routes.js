import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CarsIndex from './containers/cars-index';
import CarNew from './containers/car-new';
import CarShow from './containers/car-show';
import CarEdit from './containers/car-edit';


export default (
    <Route path='/' component={App}>
        <IndexRoute component={CarsIndex} />
        <Route path='cars/new' component={CarNew} />
        <Route path='cars/:id' component={CarShow} />
        <Route path='cars/edit/:id' component={CarEdit} />
    </Route>
);
