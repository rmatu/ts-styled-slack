/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SidebarSubscription
// ====================================================

export interface SidebarSubscription_Channel_Memberships {
  __typename: "Membership";
  userid: string;
  direct: boolean;
  id: any;
}

export interface SidebarSubscription_Channel {
  __typename: "Channel";
  id: any;
  name: string;
  /**
   * An array relationship
   */
  Memberships: SidebarSubscription_Channel_Memberships[];
}

export interface SidebarSubscription {
  /**
   * fetch data from the table: "Channel"
   */
  Channel: SidebarSubscription_Channel[];
}

export interface SidebarSubscriptionVariables {
  username?: string | null;
}
