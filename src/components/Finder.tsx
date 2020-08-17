import React, { useContext } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { StoreContext, Context } from '../store/store';
import { CreateChannel } from '../generated/CreateChannel';
import { CreateMembership } from '../generated/CreateMembership';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: lightgrey;
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

const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel($name: String) {
    insert_Channel(objects: { name: $name, group: "" }) {
      returning {
        id
      }
    }
  }
`;

const CREATE_MEMBERSHIP_MUTATION = gql`
  mutation CreateMembership($userid: String, $channelid: uuid) {
    insert_Membership(objects: { userid: $userid, channelid: $channelid }) {
      returning {
        id
      }
    }
  }
`;

interface FinderProps {
  exitCallback: () => void;
}

const Finder: React.FC<FinderProps> = ({ exitCallback }) => {
  const { user, selectedChannel } = useContext<Context>(StoreContext);
  const [createChannel] = useMutation<CreateChannel>(CREATE_CHANNEL_MUTATION);
  const [createMembership] = useMutation<CreateMembership>(
    CREATE_MEMBERSHIP_MUTATION
  );

  return (
    <Container>
      <>
        <ExitButtonContainer>
          <ButtonClose onClick={exitCallback}>
            <i className="far fa-times-circle" />
            esc
          </ButtonClose>
        </ExitButtonContainer>
        <h1>Create channel</h1>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            createChannel({
              variables: { name: e.target.channelName.value },
            });
            createMembership({
              variables: {
                channelid: selectedChannel.id,
                userid: user,
              },
            });
            e.target.reset();
          }}
        >
          <label htmlFor="channelName">Name</label>
          <input name="channelName" id="channelName" placeholder="eg leads" />
          <button onClick={exitCallback}>Cancel</button>
          <button type="submit">Create</button>
        </Form>
      </>
    </Container>
  );
};

export default Finder;
