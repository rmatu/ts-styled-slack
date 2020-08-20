import styled from 'styled-components';

export const DataItem = styled.div`
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.borderColorLight};
  box-sizing: border-box;
  cursor: pointer;
`;

export const DataContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  min-height: 0;
  transition: all 0.5 ease-in;
  &:last-of-type {
    border-bottom: 1px solid ${(props) => props.theme.borderColorLight};
  }
`;
