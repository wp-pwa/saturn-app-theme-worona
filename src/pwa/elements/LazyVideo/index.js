import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import LazyLoad from 'react-lazy-load';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'styled-components';

const LazyVideo = ({ children, width, height, isAmp, youtubeId }) => (
  <Container height={height} width={width}>
    <Icon>
      <IconVideo size={40} />
    </Icon>
    {isAmp && youtubeId ? (
      <amp-youtube width={1} height={1} layout="responsive" data-videoid={youtubeId} />
    ) : (
      <StyledLazyLoad offsetVertical={500} throttle={50}>
        {children}
      </StyledLazyLoad>
    )}
  </Container>
);

LazyVideo.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
  isAmp: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAmp: dep('build', 'selectors', 'getAmp')(state),
});

export default connect(mapStateToProps)(LazyVideo);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  amp-youtube,
  iframe {
    width: ${props => props.width};
    height: ${props => props.height};
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  color: transparent;
  border: none !important;
`;
