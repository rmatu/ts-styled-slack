import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext, Context } from '../store/store';

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  background-color: white;
  width: calc(100vw - 220px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;
`;

const Title = styled.div`
  h3 {
    font-weight: 900;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
  i {
    margin-right: 0.5rem;
    color: darkgrey;
  }
`;

const Input = styled.input`
  border: 1px solid darkgrey;
  padding: 0.5rem;
  border-radius: 5px;
  outline: none;
  &::placeholder {
    font-size: 1rem;
  }
  &:hover,
  &:active,
  &:focus {
    border: 1px solid DimGray;
  }
`;
interface MainContentHeaderProps {}

const MainContentHeader: React.FC<MainContentHeaderProps> = () => {
  const { selectedChannel } = useContext<Context>(StoreContext);

  return (
    <Container>
      <Title>
        <div>
          <h3>#{selectedChannel.name}</h3>
        </div>
        <div>
          <i className="far fa-user" />
          42 members
        </div>
      </Title>
      <div>
        <Input type="text" placeholder="search" />
      </div>
    </Container>
  );
};

export default MainContentHeader;
