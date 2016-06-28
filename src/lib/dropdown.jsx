import React from 'react';
import _ from 'lodash';

const _selectItem = (selectedValue, item) =>
  _.merge({}, item,
    {props: {selected: `${item.props.value}` === selectedValue}});

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({open: ! this.state.open});
  }

  render() {
    const dropdownStyle = {};

    dropdownStyle.height = this.props.height ? this.props.height + 'px' : '120px';

    return (
      <div
        onClick={this.toggleOpen}
        className={`dropdown-container ${this.props.className} ${this.state.open ? 'open' : ''}`}
      >
        <div className={`dropdown-choice ${this.props.selectedValue ? 'selected' : ''}`}>
          <span style={this.props.selectedLabelStyle}>
            {this.props.selectedValue || this.props.defaultText || 'Choose'}
          </span>
          <div className='toggle-container'><b className='toggle-container-icon'></b></div>
        </div>
        <ul style={dropdownStyle}
          className={`dropdown-drop dropdown-results ${this.state.open ? 'open' : ''}`}
        >
          {React.Children.map(
             this.props.children,
             _.partial(_selectItem, this.props.selectedValue))}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  height: React.PropTypes.number,
  options: React.PropTypes.array,
  defaultText: React.PropTypes.string,
  children: React.PropTypes.array,
  className: React.PropTypes.string,
  selectedValue: React.PropTypes.string,
  selectedLabelStyle: React.PropTypes.object
};

export default Dropdown;
