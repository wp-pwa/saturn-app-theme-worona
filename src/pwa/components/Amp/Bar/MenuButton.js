import React from 'react';
import IconMenu from 'react-icons/lib/md/menu';
import styled from 'styled-components';

const MenuButton = () => (
  <Container on="tap:sidebar.toggle">
    <IconMenu size={33} />
  </Container>
);

export default MenuButton;

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 15px;
  z-index: 50;
`;
