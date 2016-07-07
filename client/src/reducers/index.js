import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CarsReducer from './cars_reducer';


const rootReducer = combineReducers({
    form: formReducer,
    cars: CarsReducer
});

export default rootReducer;
