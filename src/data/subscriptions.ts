import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;

export const MEMBERSHIP_SUBSCRIPTION = gql`
  subscription SidebarSubscription {
    Membership(where: { userid: { _eq: "user2" } }) {
      id
      direct
      Channel {
        id
        name
      }
    }
  }
`;
