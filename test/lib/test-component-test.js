import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import TestComponent from '../../src/lib/test-component.jsx';

describe('<TestComponent />', () => {
  it('finds an element with id test', () => {
    expect(shallow(<TestComponent />).is('#test')).to.equal(true);
  });
});
