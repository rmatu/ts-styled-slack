import React, { useEffect, createRef, useContext } from 'react';
import styled from 'styled-components';
import { useSubscription } from '@apollo/client';
import { StoreContext, Context } from '../store/store';

import { MESSAGE_SUBSCRIPTION } from '../data/subscriptions';
import { MessageSubscription } from '../generated/MessageSubscription';

import { groupBy } from 'lodash';
import { isToday, isYesterday } from 'date-fns';

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

const DateHeader = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 1rem 0;
  text-transform: capitalize;
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgrey;
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
      variables: { channelId: selectedChannel!.id },
    }
  );

  let dates: any;
  if (data && data.Message) {
    dates = groupBy(data.Message, (message: any) =>
      new Intl.DateTimeFormat(
        navigator.languages ? navigator.languages[0] : 'en-US'
      ).format(new Date(message.date))
    );
  }

  const rtf = new (Intl as any).RelativeTimeFormat(
    navigator.languages ? navigator.languages[0] : 'en-US',
    { numeric: 'auto' }
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
          {!loading && data.Message
            ? Object.keys(dates).map((key) => (
                <div key={key}>
                  <DateHeader>
                    {isToday(new Date(dates[key][0].date))
                      ? rtf.format(0, 'day')
                      : isYesterday(new Date(dates[key][0].date))
                      ? rtf.format(-1, 'day')
                      : key}
                  </DateHeader>
                  {dates[key].map((message: any) => {
                    return (
                      <li key={message.id}>
                        <Username>{message.User.username}</Username>
                        <DateSpan>
                          {new Intl.DateTimeFormat('en-GB').format(
                            new Date(message.date)
                          )}
                        </DateSpan>
                        <p>{message.body}</p>
                      </li>
                    );
                  })}
                </div>
              ))
            : null}
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
