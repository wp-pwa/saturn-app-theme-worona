import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

class Menu extends Component {
  static propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static renderItems(item, index) {
    const { label, url } = item;

    return (
      <li key={index}>
        <a href={url}>{label}</a>
      </li>
    );
  }

  render() {
    return (
      <amp-sidebar id="sidebar" layout="nodisplay" side="left">
        <ul>{this.props.menuItems.map(Menu.renderItems)}</ul>
      </amp-sidebar>
    );
  }
}

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
});

export default connect(mapStateToProps)(Menu);
