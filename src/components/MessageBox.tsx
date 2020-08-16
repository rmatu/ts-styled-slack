import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import { gql, useSubscription } from '@apollo/client';

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgrey;
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription {
    Message(
      where: { channelId: { _eq: "614d63e1-6761-4dfe-846f-629b310637c4" } }
    ) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;

interface User {
  username: string;
}

interface Message {
  id: string;
  body: string;
  date: string;
  User: User;
}

interface MessageBoxProps {}

const MessageBox: React.FC<MessageBoxProps> = () => {
  const messageListRef = createRef<HTMLDivElement>();
  const { loading, data } = useSubscription<any>(MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    );
  }, [messageListRef]);

  return (
    <Container ref={messageListRef}>
      {!loading && data.Message ? (
        <ul>
          {(data.Message as Message[]).map((message) => (
            <li key={message.id}>
              <Username>{message.User.username}</Username>
              <DateSpan>
                {/* {new Intl.DateTimeFormat('en-GB').format(
                  new Date(message.date)
                )} */}
                {message.date}
              </DateSpan>
              <p>{message.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
};

export default MessageBox;
