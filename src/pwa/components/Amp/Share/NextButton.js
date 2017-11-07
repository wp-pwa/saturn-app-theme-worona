import React from 'react';
import styled from 'styled-components';
import IconNext from 'react-icons/lib/md/navigate-next';

const NextButton = () => (
  <Container>
    <Text>{'Siguiente'}</Text>
    <IconNext size={33} />
  </Container>
);

export default NextButton;

const Container = styled.div`
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  background: #ccc;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  flex-grow: 1;
  color: #333;

  &:focus {
    outline: none;
  }
`;

const Text = styled.span`
  text-transform: uppercase;
  padding-top: 1px;
  padding-right: 5px;
`;
