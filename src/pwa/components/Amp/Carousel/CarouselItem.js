/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../../Media';
import * as selectorCreators from '../../../selectorCreators';

const CarouselItem = ({ id, media, title, siteId }) => (
  <Container href={`?siteId=${siteId}&p=${id}`}>
    <Media lazy lazyHorizontal id={media} width="60vw" height="100%" />
    <InnerContainer>
      <amp-fit-text
        min-font-size={17}
        max-font-size={17}
        width={1}
        height={1}
        layout="responsive"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </InnerContainer>
  </Container>
);

CarouselItem.propTypes = {
  id: PropTypes.number.isRequired,
  media: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  media: selectorCreators.post.getMedia(id)(state),
  title: selectorCreators.post.getTitle(id)(state),
});

export default connect(mapStateToProps)(CarouselItem);

const Container = styled.a`
  box-sizing: border-box;
  width: 60vw;
  height: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.postListLight};
  position: relative;
  margin: 0;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  height: 4rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;

  amp-fit-text {
    color: #fff;
    white-space: normal;
    width: 100%;
    height: 100%;

    .i-amphtml-fit-text-content {
      justify-content: flex-start;
    }
  }
`;
