import { FETCH_CARS, FETCH_CAR } from '../actions/constants';


const INITIAL_STATE = { all: [], car: null };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CARS:
            return { ...state, all: action.payload.data }
        case FETCH_CAR:
            return { ...state, car: action.payload.data }
        default:
            return state;
    }
};
