/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SidebarSubscription
// ====================================================

export interface SidebarSubscription_Membership_Channel {
  __typename: "Channel";
  id: any;
  name: string;
}

export interface SidebarSubscription_Membership {
  __typename: "Membership";
  id: any;
  direct: boolean;
  /**
   * An object relationship
   */
  Channel: SidebarSubscription_Membership_Channel;
}

export interface SidebarSubscription {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: SidebarSubscription_Membership[];
}
