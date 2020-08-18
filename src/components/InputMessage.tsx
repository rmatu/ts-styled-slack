import React, { useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { StoreContext } from '../store/store';

import { SUBMIT_MESSAGE_MUTATION } from '../data/mutations';

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgrey;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid DimGray;
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

const SubmitButton = styled.button`
  border-radius: 7px;
  outline: none;
  background-color: white;
  border: none;
  border: 3px solid darkgrey;
  height: 56px;
  position: fixed;
  box-sizing: border-box;
  padding: 1.125rem;
  right: 24px;
  bottom: 10px;
  cursor: pointer;
`;

interface InputProps {}

const InputMessage: React.FC<InputProps> = () => {
  const [submitMessage] = useMutation(SUBMIT_MESSAGE_MUTATION);
  const { selectedChannel, user } = useContext(StoreContext);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage({
            variables: {
              userId: user,
              channelId: selectedChannel.id,
              body: (e.target as any).message.value,
            },
          });
          (e.target as any).reset();
        }}
      >
        <InputStyle name="message" type="text" placeholder="Message John Doe" />
        <SubmitButton type="submit">
          <i className="fas fa-arrow-alt-circle-right" />
        </SubmitButton>
      </form>
    </>
  );
};

export default InputMessage;
