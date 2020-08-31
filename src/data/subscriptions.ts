import { gql } from '@apollo/client';

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
  subscription SidebarSubscription($username: String) {
    Channel(where: { Memberships: { userid: { _eq: $username } } }) {
      id
      name
      Memberships {
        userid
        direct
        id
      }
      Memberships_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
