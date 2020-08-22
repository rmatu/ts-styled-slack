/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkMembershipQuery
// ====================================================

export interface checkMembershipQuery_Channel {
  __typename: "Channel";
  id: any;
  name: string;
}

export interface checkMembershipQuery {
  /**
   * fetch data from the table: "Channel"
   */
  Channel: checkMembershipQuery_Channel[];
}
