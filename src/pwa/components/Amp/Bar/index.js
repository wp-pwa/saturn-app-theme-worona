import React from 'react';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import HomeButton from './HomeButton';
import Logo from './Logo';

const Bar = () => (
  <Container>
    <MenuButton />
    <Logo />
    <HomeButton />
  </Container>
);

export default Bar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 70;
`;
