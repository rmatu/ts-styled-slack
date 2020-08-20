/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allMembershipsForUser
// ====================================================

export interface allMembershipsForUser_Membership_Channel_Memberships {
  __typename: "Membership";
  id: any;
  userid: string;
}

export interface allMembershipsForUser_Membership_Channel {
  __typename: "Channel";
  /**
   * An array relationship
   */
  Memberships: allMembershipsForUser_Membership_Channel_Memberships[];
}

export interface allMembershipsForUser_Membership {
  __typename: "Membership";
  id: any;
  /**
   * An object relationship
   */
  Channel: allMembershipsForUser_Membership_Channel;
}

export interface allMembershipsForUser {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: allMembershipsForUser_Membership[];
}

export interface allMembershipsForUserVariables {
  currentUserId?: string | null;
}
