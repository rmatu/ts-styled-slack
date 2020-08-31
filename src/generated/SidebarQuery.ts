/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarQuery
// ====================================================

export interface SidebarQuery_Channel_Memberships {
  __typename: "Membership";
  userid: string;
}

export interface SidebarQuery_Channel_Memberships_aggregate_aggregate {
  __typename: "Membership_aggregate_fields";
  count: number | null;
}

export interface SidebarQuery_Channel_Memberships_aggregate {
  __typename: "Membership_aggregate";
  aggregate: SidebarQuery_Channel_Memberships_aggregate_aggregate | null;
}

export interface SidebarQuery_Channel {
  __typename: "Channel";
  id: any;
  name: string;
  /**
   * An array relationship
   */
  Memberships: SidebarQuery_Channel_Memberships[];
  /**
   * An aggregated array relationship
   */
  Memberships_aggregate: SidebarQuery_Channel_Memberships_aggregate;
}

export interface SidebarQuery {
  /**
   * fetch data from the table: "Channel"
   */
  Channel: SidebarQuery_Channel[];
}

export interface SidebarQueryVariables {
  user: string;
}
