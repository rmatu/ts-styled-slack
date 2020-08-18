import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { StoreContext, Context } from '../../../store/store';
import {
  CREATE_CHANNEL_MUTATION,
  CREATE_MEMBERSHIP_MUTATION,
} from '../../../data/mutations';

import { CreateChannel } from '../../../generated/CreateChannel';
import { CreateMembership } from '../../../generated/CreateMembership';
import Modal from '../.././Modal/Modal.component';
import { Input } from '../../../styles/Input.styles';

const CloseButton = styled.button`
  background-color: white;
  border: 3px solid lightgrey;
  outline: none;
  border-radius: 1rem;
  color: dimgray;
  padding: 1rem;
  font-size: 1.5rem;
  transition: all 0.1s;
  margin-top: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  :hover {
    border: 3px solid dimgray;
    color: black;
  }
`;

const SubmitButton = styled(CloseButton)`
  background-color: darkgreen;
  border: 3px solid black;
  color: white;

  :disabled {
    background-color: lightgrey;
    color: black;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: white;
    border-color: 3px solid black;
  }
`;

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;

interface FinderProps {
  exitCallback: () => void;
}
const Finder: React.FC<FinderProps> = ({ exitCallback }) => {
  const { user } = useContext<Context>(StoreContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [createChannel, data] = useMutation<CreateChannel>(
    CREATE_CHANNEL_MUTATION
  );
  const [createMembership] = useMutation<CreateMembership>(
    CREATE_MEMBERSHIP_MUTATION
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  //After recieving the id from createChannel, create membership
  useEffect(() => {
    if (data.data) {
      createMembership({
        variables: {
          channelid: data.data?.insert_Channel?.returning[0].id,
          userid: user,
        },
      });
      exitCallback();
    }
  }, [data.called, exitCallback, createMembership, data.data, user]);

  return (
    <Modal close={exitCallback} title="Create channel">
      <>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            createChannel({
              variables: { name: e.target.channelName.value },
            });
            e.target.reset();
          }}
        >
          <label htmlFor="channelName">Name</label>
          <Input
            name="channelName"
            id="channelName"
            placeholder="eg leads"
            onChange={onChangeInputValue}
          />
          <CloseButton type="button" onClick={exitCallback}>
            Cancel
          </CloseButton>
          <SubmitButton disabled={inputValue === ''} type="submit">
            Create
          </SubmitButton>
        </Form>
      </>
    </Modal>
  );
};

export default Finder;
