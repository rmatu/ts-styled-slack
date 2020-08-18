import gql from 'graphql-tag';

export const messageQuery = gql`
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

export const membershipQuery = gql`
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
