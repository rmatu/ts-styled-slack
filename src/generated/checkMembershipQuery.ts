/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkMembershipQuery
// ====================================================

export interface checkMembershipQuery_Membership_Channel {
  __typename: "Channel";
  name: string;
  id: any;
}

export interface checkMembershipQuery_Membership {
  __typename: "Membership";
  id: any;
  /**
   * An object relationship
   */
  Channel: checkMembershipQuery_Membership_Channel;
}

export interface checkMembershipQuery {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: checkMembershipQuery_Membership[];
}

export interface checkMembershipQueryVariables {
  user1?: string | null;
  user2?: string | null;
}
