import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/app';


describe('Component <App />' , () => {
    it ('contains a div with class "root-app-wrapper"', () => {
        expect(shallow(<App />)
            .contains(<div className='root-app-wrapper' />)).to.be.true;
    });

    it ('should render children when passed in', () => {
        const wrapper = shallow(
            <App>
                <div className='unique' />
            </App>
        );
        expect(wrapper.contains(<div className='unique' />)).to.be.true;
    })
});
