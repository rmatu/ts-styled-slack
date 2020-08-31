import React, { useContext, useState } from 'react';
import { StoreContext, Context, Actions } from '../../../store/store';

import Modal from '../.././Modal/Modal.component';
import { Input } from '../../../styles/Input.styles';
import {
  CloseButton,
  SubmitButton,
  Form,
} from '../../../styles/ModalButtons.styles.';
import { useQuery, useMutation } from '@apollo/client';
import { allUsersQuery } from '../../../generated/allUsersQuery';
import { ALL_USERS_QUERY, CHECK_MEMBERSHIP_QUERY } from '../../../data/queries';
import { DataContainer, DataItem } from '../../../styles/DataModal.styles';
import { debounce, random } from 'lodash';
import styled from 'styled-components';

import { checkMembershipQuery } from '../../../generated/checkMembershipQuery';
import { CREATE_DM_CHANNEL } from '../../../data/mutations';

interface User {
  username: string;
  id: string;
  color: string;
}

const colors = [
  'RebeccaPurple',
  'Teal',
  'Navy',
  'MediumPurple',
  'MediumSeaGreen',
];

const UserTag = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.3rem;
  color: white;
  border-radius: 0.5rem;
  position: relative;
`;

const UserDeleteTag = styled.span.attrs({
  role: 'button',
})`
  color: white;
  font-size: 1.2rem;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 9;
  cursor: pointer;
`;

interface JoinDmProps {
  exitCallback: () => void;
}
const JoinDm: React.FC<JoinDmProps> = ({ exitCallback }) => {
  const { user, dispatch } = useContext<Context>(StoreContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { data, loading, refetch } = useQuery<allUsersQuery>(ALL_USERS_QUERY, {
    variables: {
      currentUserId: user,
      filter: `%%`,
    },
  });

  const { data: checkedMembership, refetch: checkedRefetch } = useQuery<
    checkMembershipQuery
  >(CHECK_MEMBERSHIP_QUERY([user, ...selectedUsers.map((user) => user.id)]));

  const [createDMChannel] = useMutation(
    CREATE_DM_CHANNEL([user, ...selectedUsers.map((user) => user.id)])
  );

  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({ currentUserId: user, filter: `%${e.target.value}%` });
  }, 300);

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  const onChangeInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  const setMembership = (users: User[]) => {
    checkedRefetch().then((res: any) => {
      console.log(res);
      if (res.data.Channel.length) {
        dispatch({
          type: Actions.SELECTED_CHANNEL,
          payload: res.data.Channel[0],
        });
      } else {
        createDMChannel({
          variables: {
            title: `${user}-${users.map((user) => user.id).join('-')}`,
          },
        }).then((resp) => {
          dispatch({
            type: Actions.SELECTED_CHANNEL,
            payload: resp!.data!.insert_Channel!.returning[0],
          });
        });
      }
    });
    exitCallback();
  };

  return (
    <Modal close={exitCallback} title="Create channel">
      <>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            setMembership(selectedUsers);
            e.target.reset();
          }}
        >
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="eg leads"
            onChange={(e) => {
              onChangeInputValue(e);
              filterUsers(e);
            }}
          />
          <CloseButton type="button" onClick={exitCallback}>
            Cancel
          </CloseButton>
          <SubmitButton disabled={selectedUsers.length === 0} type="submit">
            Join DM
          </SubmitButton>
        </Form>
        {selectedUsers.map((user) => (
          <UserTag key={user.id} style={{ backgroundColor: user.color }}>
            {user.username}
            <UserDeleteTag
              onClick={() =>
                setSelectedUsers((prevState: User[]) =>
                  prevState.filter((us) => us.id !== user.id)
                )
              }
            >
              X
            </UserDeleteTag>
          </UserTag>
        ))}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <DataContainer>
              {data?.User.map((user: { id: string; username: string }) => (
                <DataItem
                  key={user.id}
                  onClick={() =>
                    setSelectedUsers((prevState: User[]) => {
                      //To prevent multiple dm requests
                      if (prevState.find((us) => us.id === user.id)) {
                        return prevState;
                      } else {
                        return [
                          ...prevState,
                          { ...user, color: colors[random(0, 4)] },
                        ] as User[];
                      }
                    })
                  }
                >
                  @ {user.username}
                </DataItem>
              ))}
            </DataContainer>
          </>
        )}
      </>
    </Modal>
  );
};

export default JoinDm;
