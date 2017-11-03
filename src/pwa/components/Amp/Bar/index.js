import React from 'react';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import HomeButton from './HomeButton';

const Bar = () => (
  <Container>
    <MenuButton />
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
  transform: ${({ theme, isHidden }) => `translateY(-${isHidden ? theme.titleSize : 0})`};
  transition: transform 0.3s ease;
  z-index: 70;
`;
