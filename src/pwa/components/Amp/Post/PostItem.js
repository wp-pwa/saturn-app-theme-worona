import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../../Media';
import Header from '../../Post/Header';
import Content from '../../../elements/Content';
import SeoWord from '../../../elements/SeoWord';
import Tags from '../Tags';
import Comments from '../../Comments';
import Carousel from '../Carousel';
import MainFooter from '../../Footer';
import * as selectorCreators from '../../../selectorCreators';

const PostItem = ({ id, media }) => (
  <Container>
    <InnerContainer>
      <Media id={media} lazy height="55vh" width="100%" />
      <Header id={id} active />
      <Content id={id} type={'post'} />
      <Tags id={id} />
      <Comments id={id} active />
      <Carousel id={id} title={'Últimos artículos'} size="medium" listName={'currentList'} />
      <SeoWord />
      <MainFooter />
    </InnerContainer>
  </Container>
);

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  media: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  media: selectorCreators.post.getMedia(id)(state),
});

export default connect(mapStateToProps)(PostItem);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  position: relative;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  padding-top: ${({ theme }) => theme.titleSize};
  padding-bottom: ${({ theme }) => theme.shareBarHeight};
`;
