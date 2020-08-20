import React, { useContext } from 'react';
import styled from 'styled-components';

import { Status } from './Sidebar';
import { Channel } from './Channels';
import { StoreContext, Actions } from '../store/store';
import { Item } from '../styles/SidebarItem.styles';

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

interface DirectMessageProps {
  channels: Channel[];
}

const DirectMessages: React.FC<DirectMessageProps> = ({ channels }) => {
  const { dispatch } = useContext(StoreContext);

  const selectChannel = (channel: { id: string; name: string }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" />
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
