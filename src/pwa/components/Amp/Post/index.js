import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';
import Spinner from '../../../elements/Spinner';
import PostItem from './PostItem';
import Bar from '../Bar';
import ShareBar from '../../ShareBar';

const Post = ({ post, isPostReady, isListReady }) =>
  isPostReady && isListReady ? (
    <Container>
      <Bar />
      <PostItem id={post.id} />
      <ShareBar />
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Post.propTypes = {
  isPostReady: PropTypes.bool.isRequired,
  post: PropTypes.shape({}).isRequired,
  isListReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isPostReady: dep('connection', 'selectors', 'isCurrentSingleReady')(state),
  post: dep('connection', 'selectors', 'getCurrentSingle')(state),
  isListReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
});

export default connect(mapStateToProps)(Post);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`
  ${({ status }) => (status === 'exiting' ? 'display: none' : '')};
  z-index: 60;
`;
