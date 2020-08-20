import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { Status } from './Sidebar';
import { Channel } from './Channels';
import { StoreContext, Actions } from '../store/store';
import { Item } from '../styles/SidebarItem.styles';
import JoinDm from './Sidebar/DM/JoinDm.component';

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
  i {
    cursor: pointer;
  }
`;

interface DirectMessageProps {
  channels: Channel[];
}

const DirectMessages: React.FC<DirectMessageProps> = ({ channels }) => {
  const { dispatch } = useContext(StoreContext);
  const [isJoinDm, setIsJoinDm] = useState<boolean>(false);

  const selectChannel = (channel: { id: string; name: string }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      {isJoinDm ? <JoinDm exitCallback={() => setIsJoinDm(false)} /> : null}
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" onClick={() => setIsJoinDm(true)} />
      </MessagesTitles>
      <ul>
        {channels.map((channel) => (
          <Item
            onClick={() =>
              selectChannel({ id: channel.id, name: channel.name })
            }
            key={channel.id}
          >
            <Status /> {channel.name}
          </Item>
        ))}
      </ul>
    </>
  );
};

export default DirectMessages;
