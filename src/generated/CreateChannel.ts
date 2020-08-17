/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateChannel
// ====================================================

export interface CreateChannel_insert_Channel_returning {
  __typename: "Channel";
  id: any;
}

export interface CreateChannel_insert_Channel {
  __typename: "Channel_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: CreateChannel_insert_Channel_returning[];
}

export interface CreateChannel {
  /**
   * insert data into the table: "Channel"
   */
  insert_Channel: CreateChannel_insert_Channel | null;
}

export interface CreateChannelVariables {
  name?: string | null;
}
