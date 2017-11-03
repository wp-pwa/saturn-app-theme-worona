/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconHome from 'react-icons/lib/md/home';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const HomeButton = ({ siteId }) => (
  <Container href={`/?siteId=${siteId}`}>
    <IconHome size={33} />
  </Container>
);

HomeButton.propTypes = {
  siteId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
});

export default connect(mapStateToProps)(HomeButton);

const Container = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  color: ${({ theme }) => theme.color};
`;
