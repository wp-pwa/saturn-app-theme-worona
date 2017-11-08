import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Header from './Header';

class Menu extends Component {
  static propTypes = {
    siteId: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  constructor() {
    super();

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(item) {
    const { siteId } = this.props;
    const { type, label } = item;

    let href = `/?siteId=${siteId}`;

    if (type === 'category') href += `&cat=${item.category}`;
    else if (type === 'tag') href += `&tag=${item.tag}`;
    else if (type === 'page') href += `&page_id=${item.page}`;
    else if (type === 'link') href = item.url;

    return (
      <Item key={item.label}>
        <Link href={href}>{label}</Link>
      </Item>
    );
  }

  render() {
    return (
      <amp-sidebar id="sidebar" layout="nodisplay" side="left">
        <Container>
          <Header />
          <List>{this.props.menuItems.map(this.renderItems)}</List>
        </Container>
      </amp-sidebar>
    );
  }
}

const mapStateToProps = state => ({
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
});

export default connect(mapStateToProps)(Menu);

const Container = styled.div`
  box-sizing: border-box;
  width: 75vw;
  height: calc(100% - ${({ theme }) => theme.titleSize});
`;

const List = styled.ul`
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
`;

const Link = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.menuPaddingLeft};
  padding-right: 10px;
  height: 100%;
  width: 100%;
  font-size: 0.9rem;
  text-decoration: none;
  &,
  &:visited {
    color: #666;
  }
`;
