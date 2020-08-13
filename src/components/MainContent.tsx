import React from 'react';
import styled from 'styled-components';

import MainContentHeader from './MainContentHeader';
import MessageBox from './MessageBox';
import InputMessage from './InputMessage';

const Container = styled.div`
  padding: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  return (
    <Container>
      <MainContentHeader />
      <MessageBox />
      <InputMessage />
    </Container>
  );
};

export default MainContent;
