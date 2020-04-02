import * as React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from './login';

describe('LoginPage', () => {
    it('should not fail on render', () => {
        shallow(<LoginPage />);
    });
});
