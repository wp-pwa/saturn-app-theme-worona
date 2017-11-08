import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FacebookShare from './FacebookShare';
import NextButton from './NextButton';
import * as selectors from '../../../selectors';

const Share = ({ title, link }) => (
  <Container>
    <InnerContainer>
      <FacebookShare u={link} title={title} />
      <amp-social-share
        type="twitter"
        height="56"
        width="56"
        data-param-text={title}
        data-param-url={link}
      />
      <amp-social-share
        type="whatsapp"
        height="56"
        width="56"
        data-param-text={`${title} - ${link}`}
      />
      <amp-social-share
        type="email"
        height="56"
        width="56"
        data-param-subject={title}
        data-param-body={link}
      />
      <amp-social-share type="system" height="56" width="56" data-param-text={title} />
    </InnerContainer>
    <NextButton />
  </Container>
);

Share.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: selectors.shareBar.getTitle(state),
  link: selectors.shareBar.getLink(state),
});

export default connect(mapStateToProps)(Share);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: ${({ theme }) => theme.shareBarHeight};
  background: white;
  z-index: 50;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  width: auto;
  display: flex;
  height: ${({ theme }) => theme.shareBarHeight};

  @media (max-width: 400px) {
    & {
      max-width: calc(56px * 4);
    }
  }

  amp-social-share {
    flex-shrink: 1;
    height: ${({ theme }) => theme.shareBarHeight};
    background-size: 30px 30px;
  }

  amp-social-share:focus {
    outline: none;
  }

  amp-social-share[type='facebook'] {
    background-size: 35px 35px;
  }

  amp-social-share[type='twitter'] {
    background-size: 32px 32px;
  }

  amp-social-share[type='whatsapp'] {
    background-size: 28px 28px;
  }

  amp-social-share[type='email'] {
    background-color: #8fa9ba;
    background-size: 45px 45px;
  }

  amp-social-share[type='system'] {
    background-color: #006ca0;
    background-size: 28px 28px;
  }
`;
