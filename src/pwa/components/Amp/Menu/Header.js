import React from 'react';
import styled from 'styled-components';
import MenuLogo from './Logo';
import CloseButton from './CloseButton';

const MenuHeader = () => (
  <Container>
    <MenuLogo />
    <CloseButton />
  </Container>
);

export default MenuHeader;

const Container = styled.div`
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;
