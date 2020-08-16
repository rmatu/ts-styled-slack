/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarQuery
// ====================================================

export interface SidebarQuery_Membership_Channel {
  __typename: "Channel";
  id: any;
  name: string;
}

export interface SidebarQuery_Membership {
  __typename: "Membership";
  id: any;
  direct: boolean;
  /**
   * An object relationship
   */
  Channel: SidebarQuery_Membership_Channel;
}

export interface SidebarQuery {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: SidebarQuery_Membership[];
}
