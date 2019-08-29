import * as React from 'react';
import { mount } from 'enzyme';
import App from '~/app';

test('App should return H1', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('h1').text()).toBe('React + Typescript');
});
