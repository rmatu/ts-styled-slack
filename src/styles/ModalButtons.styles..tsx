import styled from 'styled-components';

export const CloseButton = styled.button`
  background-color: white;
  border: 3px solid lightgrey;
  outline: none;
  border-radius: 1rem;
  color: dimgray;
  padding: 1rem;
  font-size: 1.5rem;
  transition: all 0.1s;
  margin-top: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  :hover {
    border: 3px solid dimgray;
    color: black;
  }
`;

export const SubmitButton = styled(CloseButton)`
  background-color: darkgreen;
  border: 3px solid black;
  color: white;

  :disabled {
    background-color: lightgrey;
    color: black;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: white;
    border-color: 3px solid black;
  }
`;

export const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;
