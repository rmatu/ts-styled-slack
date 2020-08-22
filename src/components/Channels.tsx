import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { StoreContext, Actions } from '../store/store';
import CreateChannel from './Sidebar/Channels/CreateChannel.component';
import JoinChannel from './Sidebar/Channels/JoinChannel.component';

const ChannelsTitles = styled.div`
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

const ChannelItem = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export interface Membership {
  direct: boolean;
  id: string;
  userid: string;
}

export interface Channel {
  id: string;
  name: string;
  Memberships: Membership[];
}

interface ChannelsProps {
  channels: Channel[];
}

const Channels: React.FC<ChannelsProps> = ({ channels }) => {
  const { dispatch } = useContext(StoreContext);

  const [isCreateChannelModal, setIsCreateChannelModal] = useState<boolean>(
    false
  );
  const [isJoinChannelOpen, setIsJoinChannelOpen] = useState<boolean>(false);

  const selectChannel = (channel: { id: string; name: string }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      {isCreateChannelModal ? (
        <CreateChannel exitCallback={() => setIsCreateChannelModal(false)} />
      ) : null}
      {isJoinChannelOpen ? (
        <JoinChannel exitCallback={() => setIsJoinChannelOpen(false)} />
      ) : null}
      <ChannelsTitles>
        <h2>Channels</h2>
        <i
          className="fas fa-plus"
          onClick={() => setIsCreateChannelModal(true)}
        />
      </ChannelsTitles>
      <ul>
        {channels.map((channel) => (
          <ChannelItem
            onClick={() =>
              selectChannel({ id: channel.id, name: channel.name })
            }
            key={channel.id}
          >
            # {channel.name}
          </ChannelItem>
        ))}
      </ul>

      <Button
        className="channel-button"
        onClick={() => setIsJoinChannelOpen(true)}
      >
        <i className="fas fa-plus" /> Add channel
      </Button>
    </>
  );
};

export default Channels;
