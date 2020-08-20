/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createDMChannel
// ====================================================

export interface createDMChannel_insert_Channel_returning {
  __typename: "Channel";
  id: any;
  name: string;
}

export interface createDMChannel_insert_Channel {
  __typename: "Channel_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: createDMChannel_insert_Channel_returning[];
}

export interface createDMChannel {
  /**
   * insert data into the table: "Channel"
   */
  insert_Channel: createDMChannel_insert_Channel | null;
}

export interface createDMChannelVariables {
  user1: string;
  user2: string;
  title?: string | null;
}
