import React, { useEffect, createRef, useContext } from 'react';
import styled from 'styled-components';
import { gql, useSubscription } from '@apollo/client';
import { StoreContext, Context } from '../store/store';
import { MessageSubscription } from '../generated/MessageSubscription';

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
  subscription MessageSubscription($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
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
  const { selectedChannel } = useContext<Context>(StoreContext);
  const { loading, data } = useSubscription<MessageSubscription>(
    MESSAGE_SUBSCRIPTION,
    {
      variables: { channelId: selectedChannel.id },
    }
  );

  useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    );
  }, [messageListRef]);

  return (
    <Container ref={messageListRef}>
      {data ? (
        <>
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
        </>
      ) : (
        <>
          <p>No messages...</p>
        </>
      )}
    </Container>
  );
};

export default MessageBox;
