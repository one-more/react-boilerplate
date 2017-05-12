import React from 'react'
import {mount} from 'enzyme'

import App from './app'

describe('App', () => {
    it('initial rendering', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('h1')).toHaveLength(1)
    })
});
