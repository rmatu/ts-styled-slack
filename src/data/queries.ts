import { gql } from '@apollo/client';
import { createMembershipTemplateQuery } from '../utils';

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
  query SidebarQuery($user: String!) {
    Channel(where: { Memberships: { userid: { _eq: $user } } }) {
      id
      name
      Memberships {
        userid
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

export const CHECK_MEMBERSHIP_QUERY = (usersid: string[]) => gql`
  query checkMembershipQuery {
    Channel(
      where: {
        _and: [
          {Memberships: {direct: {_eq: true}}},
          ${createMembershipTemplateQuery(usersid).join(',')}
        ]
      }
    ) {
      id
      name
    }
  }
`;
