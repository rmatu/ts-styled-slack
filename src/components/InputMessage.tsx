import React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

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

//String! -> can't be null

const SUBMIT_MESSAGE_MUTATION = gql`
  mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!) {
    insert_Message(
      objects: { userId: $userId, body: $body, channelId: $channelId }
    ) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`;

interface InputProps {}

const InputMessage: React.FC<InputProps> = () => {
  const [submitMessage] = useMutation<any>(SUBMIT_MESSAGE_MUTATION);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage({
            variables: {
              userId: 'user1',
              channelId: '614d63e1-6761-4dfe-846f-629b310637c4',
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
