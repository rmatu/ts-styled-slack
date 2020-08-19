import React, { useContext, useEffect, useState } from 'react';
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
import {
  CloseButton,
  SubmitButton,
  Form,
} from '../../../styles/ModalButtons.styles.';

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
