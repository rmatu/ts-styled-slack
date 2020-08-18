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
  mutation SubmitMessage($userid: String!, $body: String, $channelid: uuid!) {
    insert_Message(
      objects: { userId: $userid, body: $body, channelId: $channelid }
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
