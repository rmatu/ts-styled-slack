import React, { useContext } from 'react';
import Modal from '../../Modal/Modal.component';

import { useQuery, useMutation } from '@apollo/client';
import { ALL_CHANNELS_QUERY } from '../../../data/queries';
import { allChannelsQuery } from '../../../generated/allChannelsQuery';
import styled from 'styled-components';
import { Form } from '../../../styles/ModalButtons.styles.';
import { Input } from '../../../styles/Input.styles';
import { debounce } from 'lodash';
import { StoreContext, Actions } from '../../../store/store';
import { JOIN_CHANNEL_MUTATION } from '../../../data/mutations';
import { JoinChannelMutation } from '../../../generated/JoinChannelMutation';
import { DataContainer, DataItem } from '../../../styles/DataModal.styles';

interface JoinChannel {
  exitCallback: () => void;
}

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

const JoinChannel: React.FC<JoinChannel> = ({ exitCallback }) => {
  const { user, dispatch } = useContext(StoreContext);

  const { data, loading, refetch } = useQuery<allChannelsQuery>(
    ALL_CHANNELS_QUERY,
    {
      variables: { channelName: '%%' },
    }
  );
  const [createMembership] = useMutation<JoinChannelMutation>(
    JOIN_CHANNEL_MUTATION
  );

  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({ channelName: `%${e.target.value}%` });
  }, 300);

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  const selectChannel = (
    channel: { id: string; name: string },
    Memberships: { userid: string }[]
  ) => {
    if (Memberships.some((membership) => membership.userid === user)) {
      dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
    } else {
      createMembership({
        variables: {
          channelid: channel.id,
          userid: user,
        },
      }).then((res) => {
        const channelAffiliation = res!.data!.insert_Membership!.returning[0]
          .Channel;
        dispatch({
          type: Actions.SELECTED_CHANNEL,
          payload: channelAffiliation,
        });
      });
    }
    exitCallback();
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
          <DataContainer>
            {data?.Channel.map(
              (channel: { id: string; name: string; Memberships: any }) => (
                <DataItem
                  key={channel.id}
                  onClick={() => {
                    selectChannel(
                      { id: channel.id, name: channel.name },
                      channel.Memberships
                    );
                  }}
                >
                  # {channel.name}
                </DataItem>
              )
            )}
          </DataContainer>
        </>
      )}
    </Modal>
  );
};

export default JoinChannel;
