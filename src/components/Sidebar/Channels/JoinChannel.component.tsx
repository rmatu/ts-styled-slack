import React from 'react';
import Modal from '../../Modal/Modal.component';

import { useQuery } from '@apollo/client';
import { ALL_CHANNELS_QUERY } from '../../../data/queries';
import { allChannelsQuery } from '../../../generated/allChannelsQuery';
import styled from 'styled-components';
import { Form } from '../../../styles/ModalButtons.styles.';
import { Input } from '../../../styles/Input.styles';
import { debounce } from 'lodash';

interface JoinChannel {
  exitCallback: () => void;
}

const ChannelItem = styled.div`
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.borderColorLight};
  box-sizing: border-box;
`;

const ChannelContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  &:last-of-type {
    border-bottom: 1px solid ${(props) => props.theme.borderColorLight};
  }
`;

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

const JoinChannel: React.FC<JoinChannel> = ({ exitCallback }) => {
  const { data, loading, refetch } = useQuery<allChannelsQuery>(
    ALL_CHANNELS_QUERY,
    {
      variables: { channelName: '%%' },
    }
  );

  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({ channelName: `%${e.target.value}%` });
  }, 300);

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  return (
    <Modal close={exitCallback} title="Browse channels">
      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          e.target.reset();
        }}
      >
        <SearchInput
          name="channelName"
          id="channelName"
          placeholder="Search channels"
          onChange={filterChannels}
        />
      </Form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ChannelContainer>
            {data?.Channel.map((channel) => (
              <ChannelItem key={channel.id}># {channel.name}</ChannelItem>
            ))}
          </ChannelContainer>
        </>
      )}
    </Modal>
  );
};

export default JoinChannel;
