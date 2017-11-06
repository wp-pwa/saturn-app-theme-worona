import React from 'react';
import styled from 'styled-components';
import IconClose from 'react-icons/lib/md/close';

const CloseButton = () => (
  <Container>
    <IconClose size={33} />
  </Container>
);

export default CloseButton;

const Container = styled.div.attrs({
  on: 'tap:sidebar.close',
})`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;
