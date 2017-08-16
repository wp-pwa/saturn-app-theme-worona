import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-swipeable-views';
import styled from 'styled-components';
import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { adsConfig } from '../HtmlToReactConverter/adsInjector';
import PostItem from './PostItem';
import PostItemFirst from './PostItemFirst';
import PostItemAlt from './PostItemAlt';
import LoadMore from './LoadMore';
import Ad from '../Ad';
import Footer from '../Footer';
import Spinner from '../../elements/Spinner';

const PostList = ({
  activeSlide,
  tempActiveSlide,
  activeListSlideChangeStarted,
  activeListSlideChangeFinished,
  categoriesList,
  posts,
  postList,
  isReady,
  users,
}) => {
  if (!isReady) return <Spinner />;

  return (
    <Slider
      index={activeSlide}
      onChangeIndex={currentIndex => {
        activeListSlideChangeStarted({
          activeSlide: currentIndex,
        });
      }}
      onTransitionEnd={() => {
        if (activeSlide === tempActiveSlide) return;

        const animation = activeSlide - tempActiveSlide > 0 ? 'left' : 'right';

        if (activeSlide === postList.length - 1 && animation === 'right') return;

        activeListSlideChangeFinished({
          activeSlide: tempActiveSlide,
          sliderAnimation: animation,
          sliderLength: postList.length,
        });
      }}
    >
      {
        <Container>
          {postList.map((id, index) => {
            let PostItemType;

            if (!index) PostItemType = PostItemFirst;
            else if (index % 3 === 0) PostItemType = PostItemAlt;
            else PostItemType = PostItem;

            const { postsBeforeAd, adList } = adsConfig;
            let adConfig;
            if ((index + 1) % postsBeforeAd === 0) {
              adConfig = adList[Math.floor(index / postsBeforeAd)];
            }

            return (
              <div key={id}>
                <PostItemType
                  id={id}
                  post={posts[id]}
                  postList={postList}
                  title={posts[id].title.rendered}
                  author={users[posts[id].author]}
                />
                {adConfig ? <Ad {...adConfig} /> : null}
              </div>
            );
          })}
          <LoadMore />
          <Footer />
        </Container>
      }
    </Slider>
  );
};

PostList.propTypes = {
  activeSlide: PropTypes.number.isRequired,
  tempActiveSlide: PropTypes.number.isRequired,
  activeListSlideChangeStarted: PropTypes.func.isRequired,
  activeListSlideChangeFinished: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  activeSlide: selectors.listSlider.getActiveSlide(state),
  tempActiveSlide: selectors.listSlider.getTempActiveSlide(state),
  posts: deps.selectors.getPostsEntities(state),
  categoriesList: deps.selectorCreators.getSetting('theme', 'menu')(state).filter(
    item => item.type === 'category' || item.type === 'blog_home'
  ),
  postList: deps.selectorCreators.getListResults('currentList')(state),
  isReady: deps.selectorCreators.isListReady('currentList')(state),
  users: deps.selectors.getUsersEntities(state),
});

const mapDispatchToProps = dispatch => ({
  activeListSlideChangeStarted: payload =>
    dispatch(actions.listSlider.activeListSlideChangeStarted(payload)),
  activeListSlideChangeFinished: payload =>
    dispatch(actions.listSlider.activeListSlideChangeFinished(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

const Container = styled.div`
  box-sizing: border-box;
  z-index: 0;

  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
