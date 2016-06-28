import chai from 'chai';
import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Dropdown from '../../src/lib/dropdown.jsx';

describe('<Dropdown />', () => {
  it('finds a dropdown container', () =>
    shallow(
        <Dropdown>
        <div />
        <div />
        </Dropdown>)
      .hasClass('dropdown-container')
      .should.be.true);

  it('applies a custom className', () =>
     shallow(<Dropdown className='custom-class' />)
     .hasClass('custom-class'));

  describe('toggling open state', () => {
    let dropdown;
    beforeEach(() => dropdown = shallow(<Dropdown />));

    it('closed by default', () =>
       dropdown.state('open').should.be.false);

    it('can be opened', () => {
      dropdown.simulate('click');

      dropdown.state('open').should.be.true;
      dropdown.hasClass('open').should.be.true;
    });

    it('can be closed', () => {
      dropdown
        .simulate('click')  // opened
        .simulate('click'); // closed

      dropdown.state('open').should.be.false;
      dropdown.hasClass('open').should.be.false;
    });

    it('shows/hides the dropdown item list', () =>{
      dropdown.simulate('click');
      dropdown.find('.dropdown-drop').hasClass('open').should.be.true;

      dropdown.simulate('click');
      dropdown.find('.dropdown-drop').hasClass('open').should.be.false;
    });
  });

  describe('setting the dropdown list height', () => {
    it('defaults to 120px',() =>
       shallow(<Dropdown/>).find('.dropdown-drop').props().style
       .height.should.equal('120px'));

    it('accepts an override for height',() =>
       shallow(<Dropdown height={ 200 } />).find('.dropdown-drop').props().style
       .height.should.equal('200px'));
  });

  describe('selected value', () => {
    const selectedValue = 'Selected Value Label';
    it('changes the visible choice',() =>
       shallow(<Dropdown selectedValue={selectedValue} />)
       .find('.dropdown-choice span').text()
       .should.equal(selectedValue));

    xit('applies selected to the selected child', () =>
        (1).should.equal(2));
  });

  describe('Default Text', () => {
    const customDefaultText = 'Custom Default';
    it('can recieve default text', () =>
       shallow(<Dropdown defaultText={customDefaultText} />)
       .find('.dropdown-choice span').text()
       .should.equal(customDefaultText));

    it('has default text', () =>
       shallow(<Dropdown />)
       .find('.dropdown-choice span').text()
       .should.equal('Choose'));
  });

  xit('contains child elements', () =>
     shallow(
         <Dropdown>
         <div className="childEl" />
         <div className="childEl" />
         </Dropdown>)
     .find('.childEl')
     .should.have.length(2));
  xit('requires children to have a value prop', () => {
    shallow(<Dropdown> text </Dropdown>).find('.childEl').should.have.length(1);
  });
});
