import React from 'react';
import * as actions from '../../src/actions/index';
import * as types from '../../src/actions/constants';


describe('actions', () => {
    it ('should create an action to fetch cars', () => {
        expect(actions.fetchCars().type).to.equal(types.FETCH_CARS);
        expect(actions.fetchCars().payload).to.be.a('Promise');
    });

    it ('should create an action to fetch a car by id', () => {
        const id = 1;
        expect(actions.fetchCar(id).type).to.equal(types.FETCH_CAR);
        expect(actions.fetchCar(id).payload).to.be.a('Promise');
    });

    it ('should create an action to create a car', () => {
        const params = {
            name: 'example', description: 'example',
            author: 'example', photoUrl: 'example'
        };
        expect(actions.createCar(params).type).to.equal(types.CREATE_CAR);
        expect(actions.createCar(params).payload).to.be.a('Promise');
    });

    it ('should create an action to update a car by id', () => {
        const id = 1,
              params = {
            name: 'example', description: 'example',
            author: 'example', photoUrl: 'example'
        };
        expect(actions.updateCar(id, params).type).to.equal(types.UPDATE_CAR);
        expect(actions.updateCar(id, params).payload).to.be.a('Promise');
    });

    it ('should create an action to delete a car by id', () => {
        const id = 1;
        expect(actions.deleteCar(id).type).to.equal(types.DELETE_CAR);
        expect(actions.deleteCar(id).payload).to.be.a('Promise');
    });

    it ('should create an action to sign in', () => {
        const name = 'example', email = 'example@test.com', password = 'pass';
        expect(actions.signIn(name, email, password).type).to.equal(types.SIGN_IN);
        expect(actions.signIn(name, email, password).payload).to.be.a('Promise');
    });

    it ('should create an action to sign out', () => {
        expect(actions.signOut().type).to.equal(types.SIGN_OUT);
        expect(actions.signOut().payload).to.be.a('Promise');
    });
});
