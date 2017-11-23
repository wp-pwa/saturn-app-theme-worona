/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import * as selectors from '../../selectors';
import LoadUnload from '../LoadUnload';

import smartads from './smartads';
import adsense from './adsense';

const adSystems = {
  smartads,
  adsense,
};

const randomBetween = (min, max) => (Math.random() * (max - min)) + min; // prettier-ignore

class Ad extends Component {
  static propTypes = {
    siteId: PropTypes.number.isRequired,
    pageId: PropTypes.number.isRequired,
    formatId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    target: PropTypes.string,
    slide: PropTypes.number,
    activeSlide: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    target: null,
    slide: null,
    activeSlide: null,
    type: 'smartads',
  };

  render() {
    const { type, width, height, slide, activeSlide, formatId, adUnitPath, ...params } = this.props;
    const exit = randomBetween(2000, 6000);
    const tagId = `ad${formatId || adUnitPath}${slide !== undefined ? slide : ''}`;
    let remover;
    return (
      <Container width={width} height={height}>
        <IconContainer>
          <IconText>{'ad'}</IconText>
        </IconContainer>
        <Transition
          in={slide === activeSlide || slide === undefined}
          timeout={{ exit }}
          unmountOnExit
          enter={false}
          onExiting={() => remover && remover()}
        >
          {status => {
            if (status === 'entered' || status === 'exiting') {
              return (
                <StyledLoadUnload
                  once
                  width={width}
                  height={height}
                  topOffset={-2000}
                  bottomOffset={-2000}
                  onEnter={() => {
                    setTimeout(() => {
                      remover = adSystems[type].create({ ...params, width, height, tagId });
                    });
                  }}
                >
                  <InnerContainer id={tagId} width={width} height={height} />
                </StyledLoadUnload>
              );
            }
            return null;
          }}
        </Transition>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  target: selectors.ads.getCurrentTarget(state),
  activeSlide: selectors.post.getActiveSlide(state),
});

export default connect(mapStateToProps)(Ad);

const Container = styled.div`
  margin: 10px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  * {
    max-width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0;
  padding: 3px 5px;
  font-size: 20px;
  line-height: 20px;
  color: #bdbdbd;
  text-transform: uppercase;
  border: 3px solid #bdbdbd;
  border-radius: 4px;
`;

const StyledLoadUnload = styled(LoadUnload)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    max-width: 100%;
  }
`;
