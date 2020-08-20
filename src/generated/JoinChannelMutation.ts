/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinChannelMutation
// ====================================================

export interface JoinChannelMutation_insert_Membership_returning_Channel {
  __typename: "Channel";
  id: any;
  name: string;
}

export interface JoinChannelMutation_insert_Membership_returning {
  __typename: "Membership";
  id: any;
  /**
   * An object relationship
   */
  Channel: JoinChannelMutation_insert_Membership_returning_Channel;
}

export interface JoinChannelMutation_insert_Membership {
  __typename: "Membership_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: JoinChannelMutation_insert_Membership_returning[];
}

export interface JoinChannelMutation {
  /**
   * insert data into the table: "Membership"
   */
  insert_Membership: JoinChannelMutation_insert_Membership | null;
}

export interface JoinChannelMutationVariables {
  userid: string;
  channelid: any;
}
