import React, { useContext } from 'react';
import styled from 'styled-components';
import Channels, { Channel } from './Channels';
import DirectMessages from './DirectMessages';
import { useSubscription } from '@apollo/client';
import { MEMBERSHIP_SUBSCRIPTION } from '../data/subscriptions';

import { SidebarSubscription } from '../generated/SidebarSubscription';
import { StoreContext } from '../store/store';

const SidebarContainer = styled.div`
  height: 100%;
  background: rebeccapurple;
  padding: 1rem;
  color: white;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  font-size: 1.2rem;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`;

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.5rem;
`;

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`;

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { user } = useContext(StoreContext);
  const { loading, data } = useSubscription<SidebarSubscription>(
    MEMBERSHIP_SUBSCRIPTION,
    {
      variables: { username: user },
    }
  );

  return (
    <SidebarContainer>
      <Header>
        <H1>Slack clone</H1>
        <div>
          <i className="far fa-bell" />
        </div>
        <UsernameContainer>
          <Status />
          John Doe
        </UsernameContainer>
      </Header>
      {!loading && data ? (
        <>
          <Channels
            channels={(data!.Channel as Channel[]).filter(
              (channel) => !channel.Memberships[0].direct
            )}
          />
          <DirectMessages
            channels={(data!.Channel as Channel[]).filter(
              (channel) => channel.Memberships[0].direct
            )}
          />
        </>
      ) : null}
    </SidebarContainer>
  );
};

export default Sidebar;
