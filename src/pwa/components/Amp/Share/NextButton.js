import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import IconNext from 'react-icons/lib/md/navigate-next';

const NextButton = ({ postList, siteId, id }) => {
  const href = `/?siteId=${siteId}&p=${postList[postList.indexOf(id) + 1]}`;

  return (
    <Container href={href}>
      <Text>{'Siguiente'}</Text>
      <IconNext size={33} />
    </Container>
  );
};

NextButton.propTypes = {
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  siteId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
  id: dep('router', 'selectors', 'getId')(state),
});

export default connect(mapStateToProps)(NextButton);

const Container = styled.a`
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  background: ${({ theme }) => theme.bgColor};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  flex-grow: 1;
  text-decoration: none;

  &,
  &:visited {
    color: ${({ theme }) => theme.color};
  }
`;

const Text = styled.span`
  text-transform: uppercase;
  padding-top: 1px;
  padding-right: 2px;
`;
