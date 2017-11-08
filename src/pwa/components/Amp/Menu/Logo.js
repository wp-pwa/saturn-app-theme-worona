import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const MenuLogo = ({ title, logoUrl }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const srcset = widths.map(width => `${logoUrl}?scale.width=${width}px ${width}w`).join(', ');

  return (
    <Container>
      <InnerContainer>
        {logoUrl ? (
          <amp-img
            alt={title}
            src={logoUrl}
            height={1}
            width={1}
            srcSet={srcset}
            layout="responsive"
          />
        ) : (
          <span>{title}</span>
        )}
      </InnerContainer>
    </Container>
  );
};

MenuLogo.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
  logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state) || '',
});

export default connect(mapStateToProps)(MenuLogo);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - ${({ theme }) => theme.titleSize} - 20px);
  height: 100%;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 40px;
  margin: 0;
  text-decoration: none;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.logoSize};
  font-weight: normal;
  color: inherit !important;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  amp-img,
  img {
    height: 100%;
    width: 100%;
  }

  img {
    object-fit: contain;
    object-position: center;
  }

  span {
    height: 100%;
    line-height: 40px;
    font-size: inherit;
    overflow: hidden;
  }
`;
