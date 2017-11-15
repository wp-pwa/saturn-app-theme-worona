import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const TagItem = ({ id, type, name, siteId }) => {
  const urlType = type === 'tag' ? 'tag' : 'cat';

  return (
    <Container>
      <A href={`?siteId=${siteId}&${urlType}=${id}`}>{name}</A>
    </Container>
  );
};

TagItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id, type }) => ({
  name: dep(
    'connection',
    'selectorCreators',
    `get${type.charAt(0).toUpperCase() + type.slice(1)}ById`,
  )(id)(state).name,
});

export default connect(mapStateToProps)(TagItem);

const Container = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.shadowColor};
`;

const A = styled.a`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
`;
