import gql from 'graphql-tag';

export const MESSAGE_QUERY = gql`
  query MessageQuery($channelid: uuid) {
    Message(where: { channelid: { _eq: $channelid } }) {
      id
      body
      date
      User {
        username
      }
    }
  }
`;

export const MEMBERSHIP_QUERY = gql`
  query SidebarQuery {
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

export const ALL_CHANNELS_QUERY = gql`
  query allChannelsQuery($channelName: String) {
    Channel(
      where: {
        name: { _ilike: $channelName }
        Memberships: { direct: { _eq: false } }
      }
    ) {
      id
      name
      Memberships {
        userid
      }
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query allUsersQuery($currentUserId: String, $filter: String) {
    User(
      where: { id: { _neq: $currentUserId }, username: { _ilike: $filter } }
    ) {
      id
      username
    }
  }
`;

export const ALL_MEMBERSHIPS_FOR_USER_QUERY = gql`
  query allMembershipsForUser($currentUserId: String) {
    Membership(
      where: { userid: { _eq: $currentUserId }, direct: { _eq: true } }
    ) {
      id
      Channel {
        Memberships {
          id
          userid
        }
      }
    }
  }
`;

export const CHECK_MEMBERSHIP_QUERY = gql`
  query checkMembershipQuery($user1: String, $user2: String) {
    Membership(
      where: {
        userid: { _eq: $user1 }
        direct: { _eq: true }
        Channel: { Memberships: { userid: { _eq: $user2 } } }
      }
    ) {
      id
      Channel {
        name
        id
      }
    }
  }
`;
