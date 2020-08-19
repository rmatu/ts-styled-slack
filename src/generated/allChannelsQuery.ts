/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allChannelsQuery
// ====================================================

export interface allChannelsQuery_Channel {
  __typename: "Channel";
  id: any;
  name: string;
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
