import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { Status } from './Sidebar';
import { Channel } from './Channels';
import { StoreContext, Actions } from '../store/store';
import { Item } from '../styles/SidebarItem.styles';
import JoinDm from './Sidebar/DM/JoinDm.component';
import { Membership } from './Channels';

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

const MembersCount = styled.span`
  padding: 3px;
  background-color: ${(props) => props.theme.backgroundColorGrey};
  color: ${(props) => props.theme.textColorDark};
  margin-right: calc(0.4rem - 1px);
  border-radius: 80%;
`;

interface DirectMessageProps {
  channels: Channel[];
}

const DirectMessages: React.FC<DirectMessageProps> = ({ channels }) => {
  const { user, dispatch } = useContext(StoreContext);
  const [isJoinDm, setIsJoinDm] = useState<boolean>(false);

  const selectChannel = (channel: {
    id: string;
    name: string;
    members: number;
  }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  const DMTitles = (channel: Channel) => {
    return channel.Memberships.reduce((acc, value: Membership) => {
      if (value.userid !== user) {
        return [...acc, value.userid];
      }
      return acc;
    }, [] as string[]).join(' - ');
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
              selectChannel({
                id: channel.id,
                name: channel.name,
                members: channel.Memberships_aggregate.aggregate.count,
              })
            }
            key={channel.id}
          >
            {channel.Memberships.length === 2 ? (
              <Status />
            ) : (
              <MembersCount>{channel.Memberships.length - 1}</MembersCount>
            )}
            {DMTitles(channel)}
          </Item>
        ))}
      </ul>
    </>
  );
};

export default DirectMessages;
