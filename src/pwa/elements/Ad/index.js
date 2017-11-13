/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { dep } from 'worona-deps';
import * as selectors from '../../selectors';
import LoadUnload from '../LoadUnload';

let firstAd = true;

const create = args => {
  const sas = window && window.sas ? window.sas : {};

  const callParams = { ...args, async: true };
  const { tagId } = args;

  sas.cmd = sas.cmd || [];

  if (firstAd) {
    firstAd = false;
    sas.cmd.push(() => {
      sas.setup({ networkid: 2506, domain: '//www8.smartadserver.com', async: true });
    });
  }

  sas.cmd.push(() => {
    const containerExists = window.document.getElementById(tagId) !== null;
    if (containerExists) sas.call('iframe', callParams);
  });
};

const randomBetween = (min, max) => (Math.random() * (max - min)) + min; // prettier-ignore

const Ad = ({ siteId, pageId, formatId, target, width, height, slide, activeSlide, isAmp }) => {
  const tagId = `ad${formatId}${slide || ''}`;
  const exit = randomBetween(2000, 6000);

  return (
    <Container styles={{ width, height }}>
      <IconContainer>
        <IconText>{'ad'}</IconText>
      </IconContainer>
      {isAmp ? (
        <amp-ad
          type="smartadserver"
          data-site={siteId}
          data-page={pageId}
          data-format={formatId}
          data-domain="https://www8.smartadserver.com"
          data-target={target}
          width={width}
          height={height}
        />
      ) : (
        <Transition
          in={slide === activeSlide || slide === undefined}
          timeout={{ exit }}
          unmountOnExit
          enter={false}
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
                      create({ siteId, pageId, formatId, target, width, height, tagId });
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
      )}
    </Container>
  );
};

Ad.propTypes = {
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isAmp: PropTypes.bool.isRequired,
  target: PropTypes.string,
  slide: PropTypes.number,
  activeSlide: PropTypes.number,
};

const mapStateToProps = state => ({
  target: selectors.ads.getCurrentTarget(state),
  activeSlide: selectors.post.getActiveSlide(state),
  isAmp: dep('build', 'selectors', 'getAmp')(state),
});

export default connect(mapStateToProps)(Ad);

const Container = styled.div`
  margin: 10px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ styles }) => styles.height}px;
  width: ${({ styles }) => styles.width}px;

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
