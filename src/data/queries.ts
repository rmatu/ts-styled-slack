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
