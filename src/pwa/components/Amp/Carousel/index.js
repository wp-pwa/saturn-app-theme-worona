import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import CarouselItem from './CarouselItem';

class Carousel extends Component {
  componentWillMount() {
    const { listName, isReady, newPostsListRequested } = this.props;

    if (!isReady) newPostsListRequested({ name: listName });
  }

  render() {
    const { id, title, size, list, isReady, siteId } = this.props;
    const filteredList = list.filter(postId => postId !== id).slice(0, 5);

    return isReady && list && list.length ? (
      <Container size={size}>
        <Title>{title}</Title>
        <amp-carousel type="carousel" height={1} width={1} layout="responsive">
          {filteredList.map(postId => <CarouselItem key={postId} id={postId} siteId={siteId} />)}
        </amp-carousel>
      </Container>
    ) : null;
  }
}

Carousel.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  isReady: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  siteId: PropTypes.string.isRequired,
  newPostsListRequested: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { listName }) => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')(listName)(state),
  list: dep('connection', 'selectorCreators', 'getListResults')(listName)(state),
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
});

const mapDispatchToProps = dispatch => ({
  newPostsListRequested: payload =>
    dispatch(dep('connection', 'actions', 'newPostsListRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;

  amp-carousel {
    height: ${({ size }) => {
      if (size === 'small') return 130;
      if (size === 'medium') return 220;
      if (size === 'large') return 270;
      return 220;
    }}px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: stretch;
    list-style: none;
    margin: 0 !important;
    padding: 0;
    overflow-x: scroll;
    -webkit-overflow-scrolling: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .amp-carousel-button {
      display: none;
    }

    .i-amphtml-scrollable-carousel-container {
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const Title = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 15px 10px 15px;
`;
