/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allChannelsQuery
// ====================================================

export interface allChannelsQuery_Channel_Memberships {
  __typename: "Membership";
  userid: string;
}

export interface allChannelsQuery_Channel_Memberships_aggregate_aggregate {
  __typename: "Membership_aggregate_fields";
  count: number | null;
}

export interface allChannelsQuery_Channel_Memberships_aggregate {
  __typename: "Membership_aggregate";
  aggregate: allChannelsQuery_Channel_Memberships_aggregate_aggregate | null;
}

export interface allChannelsQuery_Channel {
  __typename: "Channel";
  id: any;
  name: string;
  /**
   * An array relationship
   */
  Memberships: allChannelsQuery_Channel_Memberships[];
  /**
   * An aggregated array relationship
   */
  Memberships_aggregate: allChannelsQuery_Channel_Memberships_aggregate;
}

export interface allChannelsQuery {
  /**
   * fetch data from the table: "Channel"
   */
  Channel: allChannelsQuery_Channel[];
}

export interface allChannelsQueryVariables {
  channelName?: string | null;
}
