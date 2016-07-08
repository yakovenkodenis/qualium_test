import carsReducer from '../../src/reducers/cars_reducer';


describe('cars reducer', () => {
    it ('should return the initial state', () => {
        expect(
            carsReducer(undefined, {})
        ).to.deep.equal({
            all: [],
            car: null
        });
    });
});
