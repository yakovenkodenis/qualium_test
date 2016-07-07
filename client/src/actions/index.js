import axios from 'axios';
import {
    FETCH_CARS,
    FETCH_CAR,
    CREATE_CAR,
    DELETE_CAR,
    UPDATE_CAR
} from '../actions/constants';


const ROOT_URL = 'http://localhost:1337/api';

export function fetchCars() {
    const request = axios.get(`${ROOT_URL}/cars`);

    return {
        type: FETCH_CARS,
        payload: request
    }
}

export function fetchCar(id) {
    const request = axios.get(`${ROOT_URL}/cars/${id}`);

    return {
        type: FETCH_CAR,
        payload: request
    }
}

export function createCar(props) {
    const request = axios.post(`${ROOT_URL}/cars`, props);

    return {
        type: CREATE_CAR,
        payload: request
    }
}

export function updateCar(props) {
    const request = axios.put(`${ROOT_URL}/cars`, props);

    return {
        type: UPDATE_CAR,
        payload: request
    }
}

export function deleteCar(id) {
    const request = axios.delete(`${ROOT_URL}/cars/${id}`);

    return {
        type: DELETE_CAR,
        payload: request
    }
}
