import React from 'react';
import styled from 'styled-components';

import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  width: 100vw;
  height: 100vh;
`;

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent />
    </Container>
  );
};

export default Layout;
