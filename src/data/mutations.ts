import gql from 'graphql-tag';

export const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel($name: String) {
    insert_Channel(objects: { name: $name, group: "" }) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_MEMBERSHIP_MUTATION = gql`
  mutation CreateMembership($userid: String, $channelid: uuid) {
    insert_Membership(objects: { userid: $userid, channelid: $channelid }) {
      returning {
        id
      }
    }
  }
`;

export const SUBMIT_MESSAGE_MUTATION = gql`
  mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!) {
    insert_Message(
      objects: { userId: $userId, body: $body, channelId: $channelId }
    ) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`;

export const JOIN_CHANNEL_MUTATION = gql`
  mutation JoinChannelMutation($userid: String!, $channelid: uuid!) {
    insert_Membership(
      objects: { channelid: $channelid, userid: $userid, direct: false }
    ) {
      returning {
        id
        Channel {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_DM_CHANNEL = gql`
  mutation createDMChannel($user1: String!, $user2: String!, $title: String) {
    insert_Channel(
      objects: {
        name: $title
        group: ""
        Memberships: {
          data: [
            { userid: $user1, direct: true }
            { userid: $user2, direct: true }
          ]
        }
      }
    ) {
      returning {
        id
        name
      }
    }
  }
`;
