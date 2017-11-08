import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import IconImage from 'react-icons/lib/fa/image';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as selectorCreators from '../../selectorCreators';

class Media extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Ignores re-render when server side rendering was active but not anymore.
    if (this.props.ssr && !nextProps.ssr) return false;
    return true;
  }

  render() {
    const {
      alt,
      width,
      height,
      lazy,
      lazyHorizontal,
      content,
      ssr,
      isAmp,
      src,
      srcSet,
    } = this.props;

    const offsets = {
      offsetVertical: 500,
      offsetHorizontal: lazyHorizontal ? 500 : 0,
    };

    if (isAmp)
      return (
        <Container content={content} height={height} width={width}>
          <Icon>
            <IconImage size={40} />
          </Icon>
          <amp-img alt={alt} height={1} width={1} src={src} srcSet={srcSet} layout={'responsive'} />
        </Container>
      );

    return (
      <Container content={content} height={height} width={width}>
        <Icon>
          <IconImage size={40} />
        </Icon>
        {lazy && !ssr ? (
          <StyledLazyLoad {...offsets} throttle={50}>
            <img alt={alt} src={src} srcSet={srcSet} />
          </StyledLazyLoad>
        ) : (
          <img alt={alt} src={src} srcSet={srcSet} />
        )}
      </Container>
    );
  }
}

Media.propTypes = {
  ssr: PropTypes.bool.isRequired, // Is server side rendering active
  isAmp: PropTypes.bool.isRequired, // Is AMP version active
  lazy: PropTypes.bool.isRequired, // Specifies if image is lazy loaded
  lazyHorizontal: PropTypes.bool.isRequired, // Applies horizontal offset when lazy loading
  content: PropTypes.bool.isRequired, // Indicates that Media will be rendered inside Content
  width: PropTypes.string.isRequired, // CSS values
  height: PropTypes.string.isRequired, // CSS values
  alt: PropTypes.string.isRequired, // Alt from HtmlToReactConverter or getAlt selector.
  src: PropTypes.string.isRequired, // Src from HtmlToReactConverter or getSrc selector.
  srcSet: PropTypes.string.isRequired, // SrcSet from HtmlToReactConverter or getSrcSet selector.
  sizes: PropTypes.string.isRequired, // sizes from HtmlToReactConverter or getSizes selector.
};

const mapStateToProps = (
  state,
  { id, alt, src, srcSet, sizes, lazy, lazyHorizontal, content },
) => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
  isAmp: dep('build', 'selectors', 'getAmp')(state),
  lazy: !!lazy,
  lazyHorizontal: !!lazyHorizontal,
  content: !!content,
  alt: alt || selectorCreators.media.getAlt(id)(state),
  src: src || selectorCreators.media.getSrc(id)(state),
  srcSet: srcSet || selectorCreators.media.getSrcSet(id)(state),
  sizes: sizes || selectorCreators.media.getSizes(id)(state),
});

export default connect(mapStateToProps)(Media);

const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;

  amp-img,
  img {
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    background-color: transparent;
    color: transparent;
    border: none !important;
  }

  ${({ content }) => (content ? 'margin: 15px 0' : '')};
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
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
