import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/app';


describe('Component <App />' , () => {
    it ('contains a div with class "root-app-wrapper"', () => {
        expect(shallow(<App />)
            .contains(<div className='root-app-wrapper' />)).to.be.true;
    });
});
