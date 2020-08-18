import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { StoreContext, Actions } from '../store/store';
import Finder from './Finder';

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

const ChannelItem = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`;

export interface Channel {
  id: string;
  name: string;
}

interface ChannelsProps {
  channels: Channel[];
}

const Channels: React.FC<ChannelsProps> = ({ channels }) => {
  const { dispatch } = useContext(StoreContext);
  // const [submitMessage] = useMutation<any>(CREATE_CHANNEL_MUTATION);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(true);

  const selectChannel = (channel: { id: string; name: string }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      {isModalOpened ? (
        <Finder exitCallback={() => setIsModalOpened(false)} />
      ) : null}
      <ChannelsTitles>
        <h2>Channels</h2>
        <i className="fas fa-plus" onClick={() => setIsModalOpened(true)} />
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

      <Button className="channel-button">
        {' '}
        <i className="fas fa-plus" /> Add channel
      </Button>
    </>
  );
};

export default Channels;
